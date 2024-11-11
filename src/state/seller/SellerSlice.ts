import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { ProfileSeller } from "../../types/ProfileSeller";

interface SellerState {
  profile: ProfileSeller | null;
  loading: boolean;
  error: string | null;
}

// Create thunk
export const fetchSellerProfile = createAsyncThunk(
  "seller/fetchProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/seller/profile', {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || 'Error fetching profile');
    }
  }
);

const initialState: SellerState = {
  profile: null,
  loading: false,
  error: null
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        console.log("Rejected error:", action.error);
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      });
  }
});

export const { clearProfile } = sellerSlice.actions;
export default sellerSlice.reducer;