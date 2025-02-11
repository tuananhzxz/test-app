import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProfileSeller, SellerReport } from "../../types/ProfileSeller";
import { api } from '../../config/Api';
    
interface ManagerSellerState {
  sellers: ProfileSeller[];
  currentSeller: ProfileSeller | null;
  sellerReport: SellerReport | null;
  loading: boolean;
  error: string | null;
}

const initialState: ManagerSellerState = {
  sellers: [],
  currentSeller: null,
  sellerReport: null,
  loading: false,
  error: null,
};

export const fetchAllSellers = createAsyncThunk(
  'managerSeller/fetchAllSellers',
  async (accountStatus?: string) => {
    const response = await api.get(`/api/seller${accountStatus ? `?accountStatus=${accountStatus}` : ''}`);
    return response.data;
  }
);

export const fetchSellerById = createAsyncThunk(
  'managerSeller/fetchSellerById',
  async (id: number) => {
    const response = await api.get(`/api/seller/${id}`);
    return response.data;
  }
);

export const fetchSellerProfile = createAsyncThunk(
  'managerSeller/fetchSellerProfile',
  async () => {
    const response = await api.get('/api/seller/profile');
    return response.data;
  }
);

export const fetchSellerReport = createAsyncThunk(
  'managerSeller/fetchSellerReport',
  async () => {
    const response = await api.get('/api/seller/report');
    return response.data;
  }
);

export const updateSeller = createAsyncThunk(
  'managerSeller/updateSeller',
  async (sellerData: Partial<ProfileSeller>) => {
    const token = localStorage.getItem('token');
    const response = await api.patch('/api/seller/update', sellerData, {
        headers: {
            'Authorization': `Bearer ${token}`
          }
    });
    return response.data;
  }
);

export const deleteSeller = createAsyncThunk(
  'managerSeller/deleteSeller',
  async (id: number) => {
    await api.delete(`/api/seller/${id}`);
    return id;
  }
);

export const updateSellerStatus = createAsyncThunk(
    'managerSeller/updateSellerStatus',
    async ({ id, status }: { id: number; status: string }) => {
      const response = await api.patch(`/api/admin/seller/${id}/status/${status}`);
      return response.data;
    }
  );

const managerSellerSlice = createSlice({
  name: 'managerSeller',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentSeller: (state) => {
      state.currentSeller = null;
    },
    clearSellerReport: (state) => {
      state.sellerReport = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all sellers
      .addCase(fetchAllSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch sellers';
      })

      // Fetch seller by ID
      .addCase(fetchSellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSeller = action.payload;
      })
      .addCase(fetchSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch seller';
      })

      // Fetch seller profile
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSeller = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch seller profile';
      })

      // Fetch seller report
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerReport = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch seller report';
      })

      // Update seller
      .addCase(updateSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSeller = action.payload;
        state.sellers = state.sellers.map(seller =>
          seller.id === action.payload.id ? action.payload : seller
        );
      })
      .addCase(updateSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update seller';
      })

      // Delete seller
      .addCase(deleteSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = state.sellers.filter(seller => seller.id !== action.payload);
        if (state.currentSeller?.id === action.payload) {
          state.currentSeller = null;
        }
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete seller';
      })
      .addCase(updateSellerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = state.sellers.map((seller) =>
          seller.id === action.payload.id ? action.payload : seller
        );
      })
      .addCase(updateSellerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update seller status';
      });
  },
});

export const { clearError, clearCurrentSeller, clearSellerReport } = managerSellerSlice.actions;
export default managerSellerSlice.reducer;