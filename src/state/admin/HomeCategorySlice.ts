import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Home, HomeCategorySection } from '../../types/HomeCategoryType';
import { HomeCategoryType } from '../../types/HomeCategoryType';
import { api } from '../../config/Api';

interface HomeCategoryState {
    home: Home | null;
    categories: HomeCategoryType[];
    loading: boolean;
    error: string | null;
}

const initialState: HomeCategoryState = {
    home: null,
    categories: [],
    loading: false,
    error: null
};

export interface CreateHomeCategoryRequest {
    name: string;
    image: string;
    categoryId: string;
    section: HomeCategorySection;
  }

export const createHomeCategories = createAsyncThunk(
    'homeCategory/createCategories',
    async (categories: CreateHomeCategoryRequest[]) => {
        const response = await api.post<Home>('/api/home-category/categories', categories);
        return response.data;
    }
);

export const getHomeCategories = createAsyncThunk(
    'homeCategory/getCategories',
    async () => {
        const response = await api.get<HomeCategoryType[]>('/api/home-category/categories');
        return response.data;
    }
);

export const updateHomeCategory = createAsyncThunk(
    'homeCategory/updateCategory',
    async ({ id, category }: { id: number, category: HomeCategoryType }) => {
        const response = await api.patch<HomeCategoryType>(`/api/home-category/admin/${id}`, category);
        return response.data;
    }
);

// Slice
const homeCategorySlice = createSlice({
    name: 'homeCategory',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        clearHomeData: (state) => {
            state.home = null;
            state.categories = [];
        }
    },
    extraReducers: (builder) => {
        // Create categories
        builder.addCase(createHomeCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createHomeCategories.fulfilled, (state, action: PayloadAction<Home>) => {
            state.loading = false;
            state.home = action.payload;
            if (action.payload.electricCategories) {
                state.categories = [
                    ...action.payload.electricCategories,
                    ...action.payload.grid,
                    ...action.payload.shopByCategory,
                    ...action.payload.dealCategories
                ];
            }
        });
        builder.addCase(createHomeCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Không thể tạo danh mục mới';
        });

        // Get categories
        builder.addCase(getHomeCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getHomeCategories.fulfilled, (state, action: PayloadAction<HomeCategoryType[]>) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(getHomeCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch categories';
        });

        // Update category
        builder.addCase(updateHomeCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateHomeCategory.fulfilled, (state, action: PayloadAction<HomeCategoryType>) => {
            state.loading = false;
            const index = state.categories.findIndex(cat => cat.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        });
        builder.addCase(updateHomeCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update category';
        });
    }
});

export const { resetError, clearHomeData } = homeCategorySlice.actions;
export default homeCategorySlice.reducer;