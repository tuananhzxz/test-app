import React from 'react';
import {
    Typography,
    Grid,
    Paper,
} from '@mui/material';
import StyledTextField from './StyledTextField';

const BecomeSellerFormStep4 = ({ formik }: any) => {
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
                Thông tin doanh nghiệp
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <StyledTextField
                        fullWidth
                        name="businessName"
                        label="Tên doanh nghiệp"
                        value={formik.values.businessName}
                        onChange={formik.handleChange}
                        error={formik.touched.businessName && Boolean(formik.errors.businessName)}
                        helperText={formik.touched.businessName && formik.errors.businessName}
                    />
                </Grid>

                <Grid item xs={12}>
                    <StyledTextField
                        fullWidth
                        name="sellerName"
                        label="Tên người bán"
                        value={formik.values.sellerName}
                        onChange={formik.handleChange}
                        error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
                        helperText={formik.touched.sellerName && formik.errors.sellerName}
                    />
                </Grid>

                <Grid item xs={12}>
                    <StyledTextField
                        fullWidth
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>

                <Grid item xs={12}>
                    <StyledTextField
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default BecomeSellerFormStep4;