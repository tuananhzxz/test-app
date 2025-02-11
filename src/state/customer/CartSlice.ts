// cartSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/Api';
import { User } from '../../types/UserType';
import { price } from '../../data/filter/price';

// Types
export interface CartItem {
 id: number;
 product: any;
 size: string;
 quantity: number;
 mrpPrice: number;
 sellingPrice: number;
 userId: number;
}

export interface Cart {
 id: number;
 user: User;
 cartItems: CartItem[];
 totalSellingPrice: number;
 totalItems: number;
 totalMrpPrice: number;
 discount: number;
 couponCode: string;
 currentPrice : number;
}

interface AddItemRequest {
 productId: number;
 size: string;
 quantity: number;
}

interface CartState {
 cart: Cart | null;
 loading: boolean;
 error: string | null;
}

// Initial state
const initialState: CartState = {
 cart: null,
 loading: false,
 error: null
};

export const applyCoupon = createAsyncThunk(
  'cart/applyCoupon',
  async ({ code, orderValue, apply }: { code: string; orderValue: number; apply: boolean }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await api.post(
        `/api/admin/coupon/apply?apply=${apply}&code=${code}&orderValue=${orderValue}`,
        null,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Không thể áp dụng phiếu giảm giá');
    }
  }
);


export const addItemToCart = createAsyncThunk<CartItem, AddItemRequest>(
  'cart/addItem',
  async (request: AddItemRequest, { rejectWithValue }) => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token'); 
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.put('/api/cart/add', request, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add item to cart'
      );
    }
  }
);

export const getUserCart = createAsyncThunk(
  'cart/getUserCart',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.get('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch cart'
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async (cartItemId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      await api.delete(`/api/cart/remove/${cartItemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove item'
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ cartItemId, quantity }: { cartItemId: number, quantity: number }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.put(
        `/api/cart/update/${cartItemId}`,
        { quantity },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update item'
      );
    }
  }
);

const cartSlice = createSlice({
 name: 'cart',
 initialState,
 reducers: {
   clearCart: (state) => {
     state.cart = null;
     state.loading = false;
     state.error = null;
   }
 },
 extraReducers: (builder) => {
   builder
     // Get cart
     .addCase(getUserCart.pending, (state) => {
       state.loading = true;
       state.error = null;
     })
     .addCase(getUserCart.fulfilled, (state, action) => {
       state.loading = false;
       state.cart = action.payload;
       state.error = null;
     })
     .addCase(getUserCart.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload as string;
     })

     // Add item
     .addCase(addItemToCart.pending, (state) => {
       state.loading = true;
       state.error = null;
     })
     .addCase(addItemToCart.fulfilled, (state, action) => {
       state.loading = false;
       if (state.cart) {
         state.cart.cartItems = [...state.cart.cartItems, action.payload];
         state.cart.totalItems = (state.cart.totalItems || 0) + 1;
         state.cart.totalMrpPrice = (state.cart.totalMrpPrice || 0) + action.payload.mrpPrice;
         state.cart.totalSellingPrice = (state.cart.totalSellingPrice || 0) + action.payload.sellingPrice;
       }
       state.error = null;
     })
     .addCase(addItemToCart.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload as string;
     })

     .addCase(removeCartItem.pending, (state) => {
       state.loading = true;
       state.error = null;
     })
     .addCase(removeCartItem.fulfilled, (state, action) => {
       state.loading = false;
       if (state.cart) {
         const removedItem = state.cart.cartItems.find(item => item.id === action.meta.arg);
         if (removedItem) {
           state.cart.cartItems = state.cart.cartItems.filter(item => item.id !== action.meta.arg);
           state.cart.totalItems = (state.cart.totalItems || 0) - 1;
           state.cart.totalMrpPrice = (state.cart.totalMrpPrice || 0) - removedItem.mrpPrice;
           state.cart.totalSellingPrice = (state.cart.totalSellingPrice || 0) - removedItem.sellingPrice;
         }
       }
       state.error = null;
     })
     .addCase(removeCartItem.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload as string;
     })

     .addCase(updateCartItem.pending, (state) => {
       state.loading = true;
       state.error = null;
     })
     .addCase(updateCartItem.fulfilled, (state, action) => {
      state.loading = false;
      if (state.cart) {
        const index = state.cart.cartItems.findIndex(
          (item: CartItem) => item.id === action.meta.arg.cartItemId
        );
        
        if (index !== -1) {
          state.cart.cartItems[index] = action.payload;
          
          state.cart.totalMrpPrice = state.cart.cartItems.reduce(
            (sum, item) => sum + item.mrpPrice, 0
          );
          state.cart.totalSellingPrice = state.cart.cartItems.reduce(
            (sum, item) => sum + item.sellingPrice, 0
          );
        }
      }
      state.error = null;
    })
     .addCase(updateCartItem.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload as string;
     })
     .addCase(applyCoupon.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(applyCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    })
    .addCase(applyCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
 }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;