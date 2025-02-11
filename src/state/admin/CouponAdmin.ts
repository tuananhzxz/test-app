import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../config/Api';

export interface Coupon {
  id: number;
  code: string;
  discountPercentage: number;
  validityStartDate: string;
  validityEndDate: string;
  minimumOrderValue: number;
  isActive: boolean;
}

interface CouponState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupons: [],
  loading: false,
  error: null,
};

const BASE_URL = '/api/admin/coupon';

export const fetchAllCoupons = createAsyncThunk('coupons/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`${BASE_URL}/admin/all`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch coupons');
  }
});

export const createCoupon = createAsyncThunk('coupons/create', async (coupon: Omit<Coupon, 'id'>, { rejectWithValue }) => {
  try {
    const response = await api.post(`${BASE_URL}/admin/create`, coupon);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create coupon');
  }
});

export const deleteCoupon = createAsyncThunk('coupons/delete', async (id: number, { rejectWithValue }) => {
  try {
    const response = await api.delete(`${BASE_URL}/admin/delete/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete coupon');
  }
});

const couponSlice = createSlice({
  name: 'couponAdmin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action: PayloadAction<Coupon[]>) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchAllCoupons.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action: PayloadAction<Coupon>) => {
        state.loading = false;
        state.coupons.push(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.coupons = state.coupons.filter((coupon) => coupon.id !== action.payload);
      })
      .addCase(deleteCoupon.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default couponSlice.reducer;
