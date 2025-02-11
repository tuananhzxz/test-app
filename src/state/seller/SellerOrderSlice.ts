
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order, OrderStatus } from "../../types/orderType";
import { api } from "../../config/Api";

interface SellerOrderState {
    orders: Order[];
    isLoading: boolean;
    error: string | null;
    updateStatus: {
      isLoading: boolean;
      error: string | null;
    }
  }
  
  const initialState: SellerOrderState = {
    orders: [],
    isLoading: false,
    error: null,
    updateStatus: {
      isLoading: false,
      error: null
    }
  };


  export const getSellerOrders = createAsyncThunk(
    'order/getSellerOrders',
    async (jwt: string, { rejectWithValue }) => {
      try {
        const response = await api.get('/api/seller/order', {
          headers: { 'Authorization': `Bearer ${jwt}` }
        });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data);
      }
    }
  );
  
  export const updateOrderStatus = createAsyncThunk(
    'order/updateOrderStatus',
    async ({ 
      orderId, 
      orderStatus, 
      jwt 
    }: { 
      orderId: number, 
      orderStatus: OrderStatus, 
      jwt: string 
    }, { rejectWithValue }) => {
      try {
        const response = await api.patch(
          `/api/seller/order/${orderId}/status/${orderStatus}`,
          null,
          {
            headers: { 'Authorization': `Bearer ${jwt}` }
          }
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data);
      }
    }
  );

  export const sellerOrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getSellerOrders.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(getSellerOrders.fulfilled, (state, action) => {
          state.orders = action.payload;
          state.isLoading = false;
          state.error = null;
        })
        .addCase(getSellerOrders.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Failed to fetch orders';
        })
        .addCase(updateOrderStatus.pending, (state) => {
          state.updateStatus.isLoading = true;
          state.updateStatus.error = null;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
          state.updateStatus.isLoading = false;
          state.updateStatus.error = null;
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
          state.updateStatus.isLoading = false;
          state.updateStatus.error = action.error.message  || 'Failed to update order status';
        });
    }           
});

export default sellerOrderSlice.reducer;