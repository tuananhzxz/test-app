import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Deal } from '../../types/HomeCategoryType';
import { api } from '../../config/Api';

interface DealState {
    deals: Deal[],
    loading: boolean,
    error: string | null,
    dealCreated: boolean,
    dealUpdated: boolean
};

export interface ApiResponse {
    message: string;
    success: boolean;
}

const initialState  : DealState = {
    deals: [],
    loading: false,
    error: null,
    dealCreated: false,
    dealUpdated: false
};

export const getDeal = createAsyncThunk(
    'deal/getDeal',
    async () => {
        try {
            const response = await api.get('/api/deal');
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }
);

export const createDeal = createAsyncThunk(
    'deal/createDeal',
    async (deal: Deal) => {
        try {
            const response = await api.post('/api/deal', deal);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }
);

export const updateDeal = createAsyncThunk(
    'deal/updateDeal',
    async ({ deal, id }: { deal: Deal; id: number }) => {
        try {
            const response = await api.patch(`/api/deal/${id}`, deal);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }
);

export const deleteDeal = createAsyncThunk(
    'deal/deleteDeal',
    async (id: number) => {
        try {
            const response = await api.delete(`/api/deal/${id}`);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }
);

const dealAdminSlice = createSlice({
    name: 'dealAdmin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDeal.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDeal.fulfilled, (state, action) => {
                state.loading = false;
                state.deals = action.payload;
            })
            .addCase(getDeal.rejected, (state, action : PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createDeal.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDeal.fulfilled, (state, action) => {
                state.loading = false;
                state.deals.push(action.payload);
            })
            .addCase(createDeal.rejected, (state, action : PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateDeal.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateDeal.fulfilled, (state, action) => {
                state.loading = false;
                state.deals = state.deals.map((deal) =>
                    deal.id === action.payload.id ? action.payload : deal
                );
            })
            .addCase(updateDeal.rejected, (state, action : PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteDeal.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDeal.fulfilled, (state, action) => {
                state.loading = false;
                state.deals = state.deals.filter((deal) => deal.id !== action.payload.id);
            })
            .addCase(deleteDeal.rejected, (state, action : PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export default dealAdminSlice.reducer;