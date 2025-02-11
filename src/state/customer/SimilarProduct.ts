import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "./ProductCustomerSlice";
import { api } from "../../config/Api";

export const getSimilarProducts = createAsyncThunk<Product[], { categoryId: number, currentProductId?: number }>(
    "products/getSimilarProducts",
    async ({ categoryId, currentProductId }, { rejectWithValue }) => {
      try {
        const response = await api.get('/api/product/similar', {
          params: { 
            categoryId,
            currentProductId
          }
        });
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue({
          success: false,
          message: error.response?.data?.message || "Failed to fetch similar products",
        });
      }
    }
  );

  export interface ProductSimilarState {
    similarProducts: Product[];
    loading: boolean;
    error: string | null | undefined;
  }

  const initialState: ProductSimilarState = {
    similarProducts: [],
    loading: false,
    error: null,
  };
  
  const productSimilarSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(getSimilarProducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(getSimilarProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.similarProducts = action.payload;
        })
        .addCase(getSimilarProducts.rejected, (state, action: any) => {
          state.loading = false;
          state.error = action.payload?.message || "Lỗi khi tải sản phẩm tương tự";
        });
    },
  });

export default productSimilarSlice.reducer;