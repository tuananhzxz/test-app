import React from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  InputAdornment,
  Alert,
  Container
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/vi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Save, Close } from '@mui/icons-material';
import dayjs from 'dayjs';

interface FormValues {
    code: string;
    discountPercent: string;
    minimumAmount: string;
    startDate: dayjs.Dayjs | null;
    endDate: dayjs.Dayjs | null;
  }

const validationSchema = yup.object({
  code: yup
    .string()
    .required('Vui lòng nhập mã giảm giá')
    .min(4, 'Mã giảm giá phải có ít nhất 4 ký tự')
    .matches(/^[A-Z0-9_]+$/, 'Mã giảm giá chỉ được chứa chữ hoa, số và dấu gạch dưới'),
  discountPercent: yup
    .number()
    .required('Vui lòng nhập phần trăm giảm giá')
    .min(1, 'Phần trăm giảm giá phải từ 1% trở lên')
    .max(100, 'Phần trăm giảm giá không thể vượt quá 100%'),
  minimumAmount: yup
    .number()
    .required('Vui lòng nhập số tiền tối thiểu')
    .min(0, 'Số tiền tối thiểu không thể âm'),
  startDate: yup
    .date()
    .required('Vui lòng chọn ngày bắt đầu')
    .min(new Date(), 'Ngày bắt đầu phải từ ngày hiện tại trở đi'),
  endDate: yup
    .date()
    .required('Vui lòng chọn ngày kết thúc')
    .min(yup.ref('startDate'), 'Ngày kết thúc phải sau ngày bắt đầu'),
});

const AddNewCoupon = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      code: '',
      discountPercent: '',
      minimumAmount: '',
      startDate: null,
      endDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
              Thêm mã giảm giá mới
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Mã giảm giá"
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.code && Boolean(formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code}
                  placeholder="VD: SUMMER2024"
                  InputProps={{
                    sx: { textTransform: 'uppercase' }
                  }}
                />

                <TextField
                  fullWidth
                  label="Phần trăm giảm giá"
                  name="discountPercent"
                  type="number"
                  value={formik.values.discountPercent}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.discountPercent && Boolean(formik.errors.discountPercent)}
                  helperText={formik.touched.discountPercent && formik.errors.discountPercent}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />

                <TextField
                  fullWidth
                  label="Số tiền tối thiểu"
                  name="minimumAmount"
                  type="number"
                  value={formik.values.minimumAmount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.minimumAmount && Boolean(formik.errors.minimumAmount)}
                  helperText={formik.touched.minimumAmount && formik.errors.minimumAmount}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₫</InputAdornment>,
                  }}
                />

                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
                  <DatePicker
                    label="Ngày bắt đầu"
                    value={formik.values.startDate}
                    onChange={(value) => formik.setFieldValue('startDate', value)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: formik.touched.startDate && Boolean(formik.errors.startDate),
                        helperText: formik.touched.startDate && (formik.errors.startDate as string),
                        onBlur: () => formik.setFieldTouched('startDate', true)
                      },
                    }}
                    minDate={dayjs()}
                  />

                  <DatePicker
                    label="Ngày kết thúc"
                    value={formik.values.endDate}
                    onChange={(value) => formik.setFieldValue('endDate', value)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: formik.touched.endDate && Boolean(formik.errors.endDate),
                        helperText: formik.touched.endDate && (formik.errors.endDate as string),
                        onBlur: () => formik.setFieldTouched('endDate', true)
                      },
                    }}
                    minDate={formik.values.startDate || dayjs()}
                  />
                </Box>

                {formik.values.code && formik.values.discountPercent && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      Mã <strong>{formik.values.code}</strong> sẽ giảm{' '}
                      <strong>{formik.values.discountPercent}%</strong> cho đơn hàng từ{' '}
                      <strong>
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(Number(formik.values.minimumAmount) || 0)}
                      </strong>
                    </Typography>
                  </Alert>
                )}

                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Close />}
                    onClick={() => formik.resetForm()}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Lưu
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default AddNewCoupon;