import React from 'react';
import {
    Typography,
    Grid,
    Paper,
} from '@mui/material';
import StyledTextField from './StyledTextField';

const BecomeSellerFormStep3 = ({ formik }: any) => {
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
                    Thông tin ngân hàng
                </Typography>

                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <StyledTextField
                            fullWidth
                            name="accountNumber"
                            label="Số tài khoản"
                            value={formik.values.accountNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
                            helperText={formik.touched.accountNumber && formik.errors.accountNumber}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StyledTextField
                            fullWidth
                            name="accountHolderName"
                            label="Tên chủ tài khoản"
                            value={formik.values.accountHolderName}
                            onChange={formik.handleChange}
                            error={formik.touched.accountHolderName && Boolean(formik.errors.accountHolderName)}
                            helperText={formik.touched.accountHolderName && formik.errors.accountHolderName}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StyledTextField
                            fullWidth
                            name="code"
                            label="Mã ngân hàng"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                        />
                    </Grid>
                </Grid>
            </Paper>
    );
};

export default BecomeSellerFormStep3;