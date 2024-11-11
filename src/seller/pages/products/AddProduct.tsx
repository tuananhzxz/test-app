import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import { uploadToCloud } from '../../../utils/uploadToCloud';
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Stack,
  Container
} from '@mui/material';
import {
  AddPhotoAlternate,
  Delete,
  Save,
  Cancel
} from '@mui/icons-material';

const categoryTwo: {[key: string]: any[]} = {
  electronic: ['Điện thoại', 'Máy tính bảng', 'Laptop', 'Máy ảnh', 'Máy quay phim', 'Phụ kiện'],
  fashion: ['Áo', 'Quần', 'Giày', 'Túi xách', 'Phụ kiện'],
  beauty: ['Mỹ phẩm', 'Chăm sóc da', 'Chăm sóc tóc', 'Trang điểm', 'Nước hoa'],
};

const categoryThree: {[key: string]: any[]} = {
  electronic: ['Điện thoại 1', 'Máy tính bảng 1', 'Laptop 1', 'Máy ảnh 1', 'Máy quay phim 1', 'Phụ kiện 1'],
  fashion: ['Áo 1', 'Quần 1', 'Giày 1', 'Túi xách 1', 'Phụ kiện 1'],
  beauty: ['Mỹ phẩm 1', 'Chăm sóc da 1', 'Chăm sóc tóc 1', 'Trang điểm 1', 'Nước hoa 1'],
};

const colors = [
  'Đỏ', 'Xanh', 'Vàng', 'Đen', 'Trắng', 'Hồng', 'Tím', 'Xám', 'Nâu'
];

const sizes = [
  'XS', 'S', 'M', 'L', 'XL', 'XXL', '35', '36', '37', '38', '39', '40', '41', '42'
];

const mainCategories = ['electronic', 'fashion', 'beauty'];

const AddProduct = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [selectedCategory2Options, setSelectedCategory2Options] = useState<string[]>([]);
  const [selectedCategory3Options, setSelectedCategory3Options] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      sizes: ""
    },
    onSubmit: (values) => {
      console.log(values);
      setSnackbarMessage('Sản phẩm đã được lưu thành công!');
      setSnackbarOpen(true);
    },
  });

  useEffect(() => {
    if (formik.values.category) {
      setSelectedCategory2Options(categoryTwo[formik.values.category] || []);
      setSelectedCategory3Options([]);
      formik.setFieldValue('category2', '');
      formik.setFieldValue('category3', '');
    }
  }, [formik.values.category]);

  useEffect(() => {
    if (formik.values.category && formik.values.category2) {
      setSelectedCategory3Options(categoryThree[formik.values.category] || []);
    }
  }, [formik.values.category2]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      
      // Kiểm tra kích thước file (ví dụ: giới hạn 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSnackbarMessage('File quá lớn. Vui lòng chọn file nhỏ hơn 5MB');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      // Kiểm tra loại file
      if (!file.type.startsWith('image/')) {
        setSnackbarMessage('Vui lòng chọn file ảnh');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      setUploadImage(true);
      
      // Tạo preview URL trước khi upload
      const previewUrl = URL.createObjectURL(file);
      
      try {
        const uploadedUrl = await uploadToCloud(file);
        console.log('Uploaded URL:', uploadedUrl);
        
        // Kiểm tra URL trả về có hợp lệ không
        if (!uploadedUrl || typeof uploadedUrl !== 'string') {
          throw new Error('Invalid upload response');
        }

        formik.setFieldValue('images', [...formik.values.images, uploadedUrl]);
        
        setSnackbarMessage('Tải ảnh lên thành công!');
        setSnackbarSeverity('success');
      } catch (error) {
        console.error('Upload error:', error);
        setSnackbarMessage('Lỗi khi tải ảnh lên!');
        setSnackbarSeverity('error');
        
        // Nếu upload thất bại, vẫn hiển thị preview
        formik.setFieldValue('images', [...formik.values.images, previewUrl]);
      }

      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error handling image:', error);
      setSnackbarMessage('Có lỗi xảy ra khi xử lý ảnh!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setUploadImage(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formik.values.images];
    newImages.splice(index, 1);
    formik.setFieldValue('images', newImages);
  };

  // Phần hiển thị ảnh trong form
  const ImagePreview = () => (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Hình ảnh sản phẩm
      </Typography>
      
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Button
          variant="contained"
          component="label"
          startIcon={<AddPhotoAlternate />}
          disabled={uploadImage}
        >
          Thêm ảnh
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
        </Button>
        {uploadImage && <CircularProgress size={24} />}
      </Stack>

      {/* Image Grid */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {formik.values.images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%', // 1:1 Aspect Ratio
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={image}
                alt={`Product ${index + 1}`}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = 'placeholder-image-url'; // URL ảnh placeholder khi load thất bại
                }}
              />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      {formik.values.images.length > 0 && (
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Số lượng ảnh: {formik.values.images.length}
        </Typography>
      )}
    </Paper>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Thêm sản phẩm mới
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                {/* Basic Info */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tên sản phẩm"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mô tả"
                    name="description"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                </Grid>

                {/* Pricing */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Giá niêm yết"
                    name="mrpPrice"
                    type="number"
                    value={formik.values.mrpPrice}
                    onChange={formik.handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Giá bán"
                    name="sellingPrice"
                    type="number"
                    value={formik.values.sellingPrice}
                    onChange={formik.handleChange}
                  />
                </Grid>

                {/* Categories */}
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Thể loại chính</InputLabel>
                    <Select
                      value={formik.values.category}
                      label="Thể loại chính"
                      onChange={(e) => formik.setFieldValue('category', e.target.value)}
                    >
                      {mainCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth disabled={!formik.values.category}>
                    <InputLabel>Thể loại phụ 1</InputLabel>
                    <Select
                      value={formik.values.category2}
                      label="Thể loại phụ 1"
                      onChange={(e) => formik.setFieldValue('category2', e.target.value)}
                    >
                      {selectedCategory2Options.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth disabled={!formik.values.category2}>
                    <InputLabel>Thể loại phụ 2</InputLabel>
                    <Select
                      value={formik.values.category3}
                      label="Thể loại phụ 2"
                      onChange={(e) => formik.setFieldValue('category3', e.target.value)}
                    >
                      {selectedCategory3Options.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Variants */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Màu sắc</InputLabel>
                    <Select
                      value={formik.values.color}
                      label="Màu sắc"
                      onChange={(e) => formik.setFieldValue('color', e.target.value)}
                    >
                      {colors.map((color) => (
                        <MenuItem key={color} value={color}>
                          {color}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Kích cỡ</InputLabel>
                    <Select
                      value={formik.values.sizes}
                      label="Kích cỡ"
                      onChange={(e) => formik.setFieldValue('sizes', e.target.value)}
                    >
                      {sizes.map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Images */}
                <Grid item xs={12}>
                <ImagePreview />
              </Grid>

                {/* Submit Buttons */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={() => formik.resetForm()}
                    >
                      Hủy
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<Save />}
                    >
                      Lưu sản phẩm
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProduct;