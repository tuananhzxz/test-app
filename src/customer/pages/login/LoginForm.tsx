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
import { loginUser, sendLoginOtp } from '../../../state/customer/AuthSliceCus';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // State management
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  // Validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Send OTP logic
  const handleSendOtp = async () => {
    // Email validation
    if (!validateEmail(email)) {
      setError('Vui lòng nhập email hợp lệ');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await dispatch(sendLoginOtp({ 
        email, 
        role: 'ROLE_CUSTOMER' 
      })).unwrap();
      setOtpSent(true);
      startCountdown();
    } catch (error: any) {
      setError(error.message || 'Không thể gửi OTP. Vui lòng thử lại.');
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

  // Login logic
  const handleLogin = async () => {
    // OTP validation
    if (otp.trim().length !== 6) {
      setError('Vui lòng nhập mã OTP 6 chữ số');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await dispatch(loginUser({ email, otp })).unwrap();
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Đăng nhập không thành công');
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
        Đăng nhập
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
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(null);
        }}
        margin="normal"
        disabled={otpSent}
      />

      {otpSent && (
        <>
          <TextField
            fullWidth
            label="Mã OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setError(null);
            }}
            margin="normal"
            inputProps={{ maxLength: 6 }}
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
        onClick={otpSent ? handleLogin : handleSendOtp}
        disabled={loading}
        sx={{ marginTop: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          otpSent ? 'Đăng nhập' : 'Gửi mã OTP'
        )}
      </Button>
    </Box>
  );
};

export default LoginForm;