import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/Api';

export const searchProducts = createAsyncThunk(
    'product/search',
    async (query: string) => {
        try {
            const response = await api.get(`/api/product/search?query=${query}`);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }
);