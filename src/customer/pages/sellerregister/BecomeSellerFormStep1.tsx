import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import StyledTextField from "./StyledTextField";

const BecomeSellerFormStep1 = ({ formik }: any) => {
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
                Thông tin liên hệ
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                <StyledTextField
                    fullWidth
                    name="phone"
                    label="Số điện thoại"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    InputProps={{
                        sx: {
                            '&::placeholder': {
                                opacity: 0.7,
                            }
                        }
                    }}
                />

                <StyledTextField
                    fullWidth
                    name="taxCode"
                    label="Mã số thuế hàng hóa"
                    value={formik.values.taxCode}
                    onChange={formik.handleChange}
                    error={formik.touched.taxCode && Boolean(formik.errors.taxCode)}
                    helperText={formik.touched.taxCode && formik.errors.taxCode}
                    InputProps={{
                        sx: {
                            '&::placeholder': {
                                opacity: 0.7,
                            }
                        }
                    }}
                />
            </Box>
        </Paper>
    );
};

export default BecomeSellerFormStep1;