import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import exp from "constants";

// Interfaces
export interface Product {
  id: number;
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  discountPercent: number;
  quantity: number;
  color: string;
  images: string[];
  numRatings: number;
  category: Category;
  sizes: string;
  reviews: Array<{
    id: number;
    content: string;
    rating: number;
    createdDate: string;
  }>;
}

interface Category {
    id? : number;
    name : string;
    categoryId: string;
    parentCategory? : Category; 
    level: number;
  }

  export const isColorMatched = (productColors: string, searchColor: string) => {
    const colorArray = productColors.split(',').map(color => color.trim());
    return colorArray.includes(searchColor);
  };

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  searchResults: Product[];
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export interface ProductParams {
  category?: string;
  brand?: string;
  colors?: string;
  sizes?: string;
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  sort?: string;
  stock?: string;
  pageNumber?: number;
}

interface ProductResponse {
  content: Product[];
  pageNumber: number;
  totalPages: number;
  totalElements: number;
  size: number;
}

export const getAllProducts = createAsyncThunk<ProductResponse, ProductParams>(
  "products/getAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/product', {
        params: {
          ...params,
          pageNumber: params.pageNumber || 0
        }
      });
      console.log('API Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error);
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || "Failed to fetch products",
      });
    }
  }
);

export const getProductById = createAsyncThunk<Product, number>(
  "products/getProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/product/${productId}`);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || "Failed to fetch product",
      });
    }
  }
);


export const getProducts = createAsyncThunk<Product[], void>(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/product/getProducts');
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || "Failed to fetch products",
      });
    }
  }
);

export const searchProduct = createAsyncThunk<Product[], string>(
  "products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/product/search', {
        params: { query }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || "Failed to fetch search results",
      });
    }
  }
);

// Initial State
const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  searchResults: [],
  totalPages: 0,
  loading: false,
  error: null,
};

// Slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.totalPages = 0;
      state.loading = false;
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Có lỗi xảy ra";
        state.products = [];
      })

      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Có lỗi xảy ra";
        state.products = [];
      })
      
      // Get Product By ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Không tìm thấy sản phẩm";
        state.selectedProduct = null;
      })

      // Search Products
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.error = null;
      })
      .addCase(searchProduct.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi tìm kiếm";
        state.searchResults = [];
      });
  },
});

// Exports
export const { 
  clearProducts, 
  clearSearchResults, 
  clearSelectedProduct 
} = productSlice.actions;

export default productSlice.reducer;
