import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../config/Api';
import { Review } from '../../types/ReviewType';

interface ReviewState {
    reviews: Review[];
    loading: boolean;
    error: string | null | undefined;
}

interface CreateReviewRequest {
    reviewText: string;
    reviewRating: number;
    productImages?: string[];
}

const initialState: ReviewState = {
    reviews: [],
    loading: false,
    error: null,
};

// Async Thunk for fetching reviews by product ID
export const fetchReviewsByProductId = createAsyncThunk(
    'reviews/fetchByProductId',
    async (productId: number, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/review/product/${productId}/reviews`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
        }
    }
);

// Async Thunk for creating a review
export const createReview = createAsyncThunk(
    'reviews/create',
    async ({ productId, reviewData }: { productId: number, reviewData: CreateReviewRequest }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');
            const response = await api.post(`/api/review/product/${productId}/reviews`, reviewData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create review');
        }
    }
);

export const updateReview = createAsyncThunk(
    'reviews/update',
    async ({ reviewId, reviewData }: { reviewId: number, reviewData: CreateReviewRequest }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');
            const response = await api.patch(`/api/review/review/${reviewId}`, reviewData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update review');
        }
    }
);

// Async Thunk for deleting a review
export const deleteReview = createAsyncThunk(
    'reviews/delete',
    async (reviewId: number, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');
            await api.delete(`/api/review/review/${reviewId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return reviewId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete review');
        }
    }
);

// Create the slice
const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        clearReviewError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Fetch Reviews
        builder.addCase(fetchReviewsByProductId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        });
        builder.addCase(fetchReviewsByProductId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Create Review
        builder.addCase(createReview.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createReview.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews.push(action.payload);
        });
        builder.addCase(createReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Update Review
        builder.addCase(updateReview.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateReview.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.reviews.findIndex(review => review.id === action.payload.id);
            if (index !== -1) {
                state.reviews[index] = action.payload;
            }
        });
        builder.addCase(updateReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Delete Review
        builder.addCase(deleteReview.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = state.reviews.filter(review => review.id !== action.payload);
        });
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export const { clearReviewError } = reviewSlice.actions;
export default reviewSlice.reducer;