import React, { useState } from 'react';
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import {
    Button,
    Box,
    Typography,
    Paper,
    Container,
    Grid,
    useTheme,
    useMediaQuery,
    Divider,
    CircularProgress
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    LocalShipping as LocalShippingIcon,
    Payment as PaymentIcon,
    Support as SupportIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const BecomeSeller = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const features = [
        {
            icon: <TrendingUpIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
            title: "Tăng trưởng doanh thu",
            description: "Tiếp cận hàng triệu khách hàng tiềm năng và mở rộng thị trường của bạn"
        },
        {
            icon: <LocalShippingIcon sx={{ fontSize: 48, color: 'success.main' }} />,
            title: "Vận chuyển thuận tiện",
            description: "Đa dạng đối tác vận chuyển, phủ sóng toàn quốc với chi phí tối ưu"
        },
        {
            icon: <PaymentIcon sx={{ fontSize: 48, color: 'warning.main' }} />,
            title: "Thanh toán an toàn",
            description: "Hệ thống thanh toán được mã hóa và bảo mật theo tiêu chuẩn quốc tế"
        },
        {
            icon: <SupportIcon sx={{ fontSize: 48, color: 'info.main' }} />,
            title: "Hỗ trợ 24/7",
            description: "Đội ngũ chuyên gia hỗ trợ nhiệt tình, giải đáp mọi thắc mắc"
        }
    ];

    const handleFormSwitch = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLogin(!isLogin);
            setIsLoading(false);
        }, 300);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            display: 'flex',
            flexDirection: 'column',
            pt: 5,
            pb: 8
        }}>
            <Container maxWidth="xl">
                <Grid container spacing={4} alignItems="center">
                    {/* Form Section */}
                    <Grid item xs={12} md={5} lg={4}>
                        <Paper
                            elevation={6}
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                backdropFilter: 'blur(10px)',
                                background: 'rgba(255, 255, 255, 0.95)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box sx={{ mb: 3, textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                    {isLogin ? 'Đăng nhập' : 'Đăng ký bán hàng'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {isLogin
                                        ? 'Đăng nhập để quản lý cửa hàng của bạn'
                                        : 'Bắt đầu hành trình kinh doanh của bạn'}
                                </Typography>
                            </Box>

                            {isLoading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <>
                                    {!isLogin ? <SellerAccountForm /> : <SellerLoginForm />}
                                </>
                            )}

                            <Divider sx={{ my: 3 }}>
                                <Typography variant="body2" color="text.secondary">
                                    hoặc
                                </Typography>
                            </Divider>

                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={handleFormSwitch}
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontSize: '1rem'
                                }}
                            >
                                {isLogin ? 'Tạo tài khoản mới' : 'Đã có tài khoản? Đăng nhập'}
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Content Section */}
                    <Grid item xs={12} md={7} lg={8} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Box sx={{ color: 'white', p: 4 }}>
                            <Typography variant="h2" sx={{
                                fontWeight: 800,
                                mb: 2,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                            }}>
                                Mở rộng kinh doanh cùng chúng tôi
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 6, opacity: 0.9 }}>
                                Nền tảng thương mại điện tử hàng đầu cho người bán hàng
                            </Typography>

                            <Grid container spacing={3}>
                                {features.map((feature, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Paper
                                            elevation={4}
                                            sx={{
                                                p: 3,
                                                height: '100%',
                                                background: 'rgba(255, 255, 255, 0.95)',
                                                borderRadius: 3,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-8px)',
                                                    boxShadow: theme.shadows[8]
                                                }
                                            }}
                                        >
                                            <Box sx={{ mb: 2 }}>
                                                {feature.icon}
                                            </Box>
                                            <Typography variant="h6" sx={{
                                                mb: 1,
                                                fontWeight: 'bold',
                                                color: 'text.primary'
                                            }}>
                                                {feature.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {feature.description}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default BecomeSeller;