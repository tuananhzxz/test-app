import { Product } from './../customer/ProductCustomerSlice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/Api';
import { User } from '../../types/UserType';

interface Wishlist {
  id: number;
  user: User;
  products: Product[];
}

interface WishlistState {
  wishlist: Wishlist | null;
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/wishlist', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error fetching wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/wishlist/add/product/${productId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error adding to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId: number, { rejectWithValue }) => {
    try {
      await api.delete(`/api/wishlist/remove/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error removing from wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add to wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        if (state.wishlist && Array.isArray(state.wishlist.products)) {
          state.wishlist.products.push(action.payload);
        }
      })
      // Remove from wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        if (state.wishlist && Array.isArray(state.wishlist.products)) {
          state.wishlist.products = state.wishlist.products.filter(
            product => product.id !== action.payload
          );
        }
      });
  },
});

export default wishlistSlice.reducer;