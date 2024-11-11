import React from 'react';
import {
    Typography,
    Grid,
    Paper,
} from '@mui/material';
import StyledTextField from './StyledTextField';

const BecomeSellerFormStep2 = ({ formik }: any) => {
    return (
            <Paper
                elevation={0}
                sx={{
                    background: 'transparent',
                    p: 3,
                    borderRadius: 4,
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        textAlign: 'center',
                        mb: 4,
                        color: 'primary.main',
                        position: 'relative',
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 60,
                            height: 3,
                            backgroundColor: 'primary.main',
                            borderRadius: 1,
                        }
                    }}
                >
                    Thông tin địa chỉ
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <StyledTextField
                            fullWidth
                            name="name"
                            label="Họ và tên"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <StyledTextField
                            fullWidth
                            name="phone"
                            label="Số điện thoại"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.pickupAddress?.phone && Boolean(formik.errors.pickupAddress?.phone)}
                            helperText={formik.touched.pickupAddress?.phone && formik.errors.pickupAddress?.phone}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <StyledTextField
                            fullWidth
                            name="code"
                            label="Mã số"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StyledTextField
                            fullWidth
                            name="address"
                            label="Địa chỉ"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StyledTextField
                            fullWidth
                            name="locality"
                            label="Phường/Xã"
                            value={formik.values.locality}
                            onChange={formik.handleChange}
                            error={formik.touched.locality && Boolean(formik.errors.locality)}
                            helperText={formik.touched.locality && formik.errors.locality}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StyledTextField
                            fullWidth
                            name="state"
                            label="Quận/Huyện"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StyledTextField
                            fullWidth
                            name="city"
                            label="Tỉnh/Thành phố"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>
                </Grid>
            </Paper>
    );
};

export default BecomeSellerFormStep2;