import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/Api';
import { User } from '../../types/UserType';

export interface AuthState {
  user: User | null;
  jwt: string | null;
  loading: boolean;
  error: string | null;
  User_Role: any;
} 

const initialState: AuthState = {
  user: null,
  jwt: localStorage.getItem('token'),
  loading: false,
  error: null,
  User_Role: null
};

export const sendLoginOtp = createAsyncThunk(
  'auth/sendLoginOtp',
  async ({ email, role }: { email: string; role: string }) => {
    const response = await api.post('/api/auth/sent/login/otp', { email, role });
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, otp }: { email: string; otp: string }) => {
    const response = await api.post('/api/auth/sent/login', { email, otp });
    console.log(response.data);
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { email: string; fullName: string; otp: string }) => {
    const response = await api.post('/api/auth/signup', userData);
    return response.data;
  }
);

export const getUserProfile = createAsyncThunk<User, string>(
  'auth/getUserProfile',
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get('/user/profile', {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Could not fetch user profile');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.jwt = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.User_Role = action.payload.role;
        localStorage.setItem('token', action.payload.jwt);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.User_Role = action.payload.role;
        localStorage.setItem('token', action.payload.jwt);
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;