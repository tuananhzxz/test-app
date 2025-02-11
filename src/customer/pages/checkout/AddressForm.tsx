import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createOrder } from '../../../state/customer/OrderSlice';
import { useAppDispatch } from '../../../state/Store';


interface AddressFormProps {
    onClose: () => void;
    paymentMethod: string;
}

const AddressForm: React.FC<AddressFormProps> = ({ onClose, paymentMethod }) => {
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            code: '',
            address: '',
            city: '',
            state: '',
            locality: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Bắt buộc'),
            phone: Yup.string().required('Bắt buộc'),
            code: Yup.string().required('Bắt buộc'),
            address: Yup.string().required('Bắt buộc'),
            city: Yup.string().required('Bắt buộc'),
            state: Yup.string().required('Bắt buộc'),
            locality: Yup.string().required('Bắt buộc')
        }),
        onSubmit: async (values) => {
            if (isSubmitting) return;
            
            setIsSubmitting(true);
            try {
                const response = await dispatch(createOrder({ 
                    shippingAddress: values, 
                    paymentMethod 
                }));
                
                if (response.payload?.payment_link_url) {
                    window.location.href = response.payload.payment_link_url;
                }
                onClose();
            } catch (error : any) {
                console.error('Address creation error:', error); 
                alert(error.message || 'Không thể thêm địa chỉ');
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
                Thông tin liên hệ
            </Typography>

            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Họ và tên"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="phone"
                            label="Số điện thoại"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="code"
                            label="Mã bưu điện"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="address"
                            label="Địa chỉ"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="city"
                            label="Thành phố"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="state"
                            label="Tiểu bang"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="locality"
                            label="Khu vực"
                            value={formik.values.locality}
                            onChange={formik.handleChange}
                            error={formik.touched.locality && Boolean(formik.errors.locality)}
                            helperText={formik.touched.locality && formik.errors.locality}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        disabled={isSubmitting}
                     >
                        {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin'}
                    </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button type="button" variant="outlined" color="secondary" fullWidth onClick={onClose}>
                            Đóng
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default AddressForm;