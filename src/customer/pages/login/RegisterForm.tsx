import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../state/Store';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  TextField, 
  Typography, 
  Alert, 
  Box, 
  Link, 
  CircularProgress 
} from '@mui/material';
import { registerUser } from '../../../state/customer/AuthSliceCus';

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    otp: ''
  });

  // State for managing UI and errors
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFullName = (name: string) => {
    return name.trim().length >= 2;
  };

  // Handle input changes with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  // Send OTP logic with enhanced error handling
  const handleSendOtp = async () => {
    // Validate email
    if (!validateEmail(formData.email)) {
      setError('Vui lòng nhập email hợp lệ');
      return;
    }

    // Validate full name
    if (!validateFullName(formData.fullName)) {
      setError('Vui lòng nhập họ và tên đầy đủ');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate OTP sending process
      // You might want to add an actual API call here if available
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpSent(true);
      startCountdown();
    } catch (error: any) {
      setError('Không thể gửi OTP. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Countdown for OTP resend
  const startCountdown = () => {
    setCountdown(60);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Register logic
  const handleRegister = async () => {
    // Validate OTP
    if (formData.otp.trim().length !== 6) {
      setError('Vui lòng nhập mã OTP 6 chữ số');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await dispatch(registerUser(formData)).unwrap();
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Đăng ký không thành công');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (countdown === 0) {
      handleSendOtp();
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 400, 
      margin: 'auto', 
      padding: 3, 
      borderRadius: 2, 
      boxShadow: 3 
    }}>
      <Typography 
        variant="h5" 
        align="center" 
        sx={{ 
          fontWeight: 'bold', 
          marginBottom: 3 
        }}
      >
        Đăng ký
      </Typography>

      {error && (
        <Alert 
          severity="error" 
          sx={{ marginBottom: 2 }}
        >
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        disabled={otpSent}
        error={!!error && !validateEmail(formData.email)}
        helperText={
          error && !validateEmail(formData.email) 
            ? 'Email không hợp lệ' 
            : ''
        }
      />

      <TextField
        fullWidth
        label="Họ và tên"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        margin="normal"
        disabled={otpSent}
        error={!!error && !validateFullName(formData.fullName)}
        helperText={
          error && !validateFullName(formData.fullName) 
            ? 'Họ và tên phải có ít nhất 2 ký tự' 
            : ''
        }
      />

      {otpSent && (
        <>
          <TextField
            fullWidth
            label="Mã OTP"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            margin="normal"
            inputProps={{ 
              maxLength: 6,
              pattern: "\\d*"
            }}
            type="text"
            error={!!error && formData.otp.trim().length !== 6}
            helperText={
              error && formData.otp.trim().length !== 6
                ? 'Mã OTP phải có 6 chữ số'
                : ''
            }
          />

          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: 1 
            }}
          >
            <Link 
              component="button"
              onClick={handleResendOtp}
              color={countdown > 0 ? 'text.disabled' : 'primary'}
              underline="hover"
              disabled={countdown > 0}
            >
              {countdown > 0 
                ? `Gửi lại sau ${countdown}s` 
                : 'Gửi lại mã OTP'}
            </Link>
          </Box>
        </>
      )}

      <Button
        variant="contained"
        fullWidth
        onClick={otpSent ? handleRegister : handleSendOtp}
        disabled={loading}
        sx={{ marginTop: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          otpSent ? 'Đăng ký' : 'Gửi mã OTP'
        )}
      </Button>
    </Box>
  );
};

export default RegisterForm;