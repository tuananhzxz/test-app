import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

interface VerifyOtpRequest {
    email: string;
    otp: string;
  }
  
  interface LoginRequest {
    email: string;
    otp: string;
  }

export const sendLoginSignupOtp = createAsyncThunk(
    "/auth/send-login-otp",
    async ({email}: {email: string}, {rejectWithValue}) => {
        try {
            const response = await api.post('/api/auth/sent/login/otp', {email: email});
            console.log("login otp response: ", response);
            
            return response.data;
        } catch (error: any) {
            // Nếu có lỗi, sử dụng rejectWithValue để trả về thông tin lỗi
            return rejectWithValue(
                error.response?.data || { 
                    message: 'Đã có lỗi xảy ra', 
                    success: false 
                }
            );
        }
    }
);

export const verifySellerOtp = createAsyncThunk<
  // Kiểu dữ liệu trả về khi thành công
  {
    success: boolean;
    message: string;
    data?: any; // Seller object hoặc bất kỳ dữ liệu nào trả về từ backend
  },
  // Kiểu tham số đầu vào
  VerifyOtpRequest,
  // Kiểu reject value
  {
    rejectValue: {
      success: boolean;
      message: string;
    }
  }
>(
  'seller/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/seller/verify/${otp}`, { email });
      
      return {
        success: true,
        message: 'OTP verified successfully',
        data: response.data
      };
    } catch (error: any) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || 'Verification failed'
      });
    }
  }
);

// Thunk để login Seller
export const loginSeller = createAsyncThunk<
  {
    success: boolean;
    message: string;
    jwt?: string;
    role?: string;
  },
  LoginRequest,
  {
    rejectValue: {
      success: boolean;
      message: string;
    }
  }
>(
  'seller/login',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/seller/login', { 
        email, 
        otp 
      });
      
      // Lưu token vào localStorage nếu cần
      if (response.data.jwt) {
        localStorage.setItem('sellerToken', response.data.jwt);
      }

      return {
        success: true,
        message: 'Login successful',
        jwt: response.data.jwt,
        role: response.data.role
      };
    } catch (error: any) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || 'Login failed'
      });
    }
  }
);

export const logout = createAsyncThunk<any, any>("/auth/logout",
  async (navigate, { rejectWithValue }) => {
    try {
      localStorage.clear();
      navigate('/');
      return {
        success: true,
        message: 'Logout successful'
      };
    } catch (error: any) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || 'Logout failed'
      });
    }
  }
)