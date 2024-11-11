import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Avatar
} from '@mui/material';
import {
  Edit,
  Save,
  Close
} from '@mui/icons-material';

interface Category {
  id: string;
  name: string;
  image: string;
}

// Mock data
const mockCategories: Category[] = [
  {
    id: 'CAT001',
    name: 'Điện thoại',
    image: 'https://example.com/phone.jpg'
  },
  {
    id: 'CAT002',
    name: 'Laptop',
    image: 'https://example.com/laptop.jpg'
  },
  {
    id: 'CAT003',
    name: 'Tablet',
    image: 'https://example.com/tablet.jpg'
  },
  // Thêm data mẫu khác...
];

const HomeCategory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditedName(category.name);
    setPreviewImage(category.image);
    setEditDialogOpen(true);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
    setSelectedCategory(null);
    setEditedName('');
    setEditedImage(null);
    setPreviewImage('');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEditedImage(file);
      // Tạo preview URL cho ảnh đã chọn
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (selectedCategory) {
      // Xử lý lưu thay đổi
      console.log('Saving changes:', {
        id: selectedCategory.id,
        name: editedName,
        image: editedImage
      });
      handleClose();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Quản lý danh mục
      </Typography>

      {/* Table */}
      <Paper elevation={1}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" width={80}>STT</TableCell>
                <TableCell width={120}>ID</TableCell>
                <TableCell width={120}>Hình ảnh</TableCell>
                <TableCell>Tên thể loại</TableCell>
                <TableCell align="right" width={100}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockCategories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category, index) => (
                  <TableRow key={category.id} hover>
                    <TableCell align="center">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>
                      <Avatar
                        src={category.image}
                        alt={category.name}
                        variant="rounded"
                        sx={{ width: 60, height: 60 }}
                      />
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(category)}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          component="div"
          count={mockCategories.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} của ${count}`
          }
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>

      {/* Edit Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Edit fontSize="small" />
            <Typography variant="h6">
              Chỉnh sửa thể loại
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Tên thể loại"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            
            <Box>
              <input
                accept="image/*"
                type="file"
                hidden
                id="image-input"
                onChange={handleImageChange}
              />
              <label htmlFor="image-input">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ mb: 2 }}
                >
                  Chọn ảnh mới
                </Button>
              </label>
              
              {previewImage && (
                <Box
                  sx={{
                    mt: 2,
                    position: 'relative',
                    width: 'fit-content'
                  }}
                >
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      maxHeight: 200,
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} startIcon={<Close />}>
            Hủy
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            startIcon={<Save />}
            disabled={!editedName.trim()}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomeCategory;