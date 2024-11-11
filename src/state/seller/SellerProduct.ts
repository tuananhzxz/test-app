import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../config/Api';
import { ProductSeller } from '../../types/ProductType';

export const fetchSellerProducts = createAsyncThunk<ProductSeller[], any> (
    "seller/fetchProducts",
    async(jwt, {rejectWithValue}) => {
        try {
            const response = await api.get('/api/seller/product', {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            })
            const data = response.data;
            console.log(data);
            return data;
        } catch (error: any) {
            return rejectWithValue({
                success: false,
                message: error.message || 'Failed to fetch products'
            });
        }
    }
)

export const createProduct = createAsyncThunk<ProductSeller, {request : any, jwt : string | null}> (
    "seller/createProduct",
    async(args, {rejectWithValue}) => {
        const { request, jwt } = args;
        try {
            const response = await api.post('/api/seller/product', request, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            })
            const data = response.data;
            return data;
        } catch (error: any) {
            return rejectWithValue({
                success: false,
                message: error.message || 'Failed to create product'
            });
        }
    }   
)

interface SellerProductState {
    products : ProductSeller[];
    loading : boolean;
    error : string | null | undefined;
}

const initialState : SellerProductState = {
    products: [],
    loading: false,
    error: null,
}

const sellerProductSlice = createSlice({
    name: "sellerProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(fetchSellerProducts.pending, (state) => {
                state.loading = true;
            })
           .addCase(fetchSellerProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
           .addCase(fetchSellerProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createProduct.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default sellerProductSlice.reducer;