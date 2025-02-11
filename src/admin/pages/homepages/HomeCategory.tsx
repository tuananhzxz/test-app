import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Avatar,
  CircularProgress,
  Alert,
  Fab,
  Tooltip,
  InputAdornment
} from '@mui/material';
import {
  Edit,
  Save,
  Close,
  Add as AddIcon,
  Search
} from '@mui/icons-material';
import { HomeCategorySection, HomeCategoryType } from '../../../types/HomeCategoryType';
import { RootState, useAppDispatch } from '../../../state/Store';
import { createHomeCategories, getHomeCategories, updateHomeCategory } from '../../../state/admin/HomeCategorySlice';
import { uploadToCloud } from '../../../utils/uploadToCloud';

export interface CreateHomeCategoryRequest {
  name: string;
  image: string;
  categoryId: string;
  section: HomeCategorySection;
}

interface HomeCategoryProps {
  section: HomeCategorySection;
}

const mapSectionStringToEnum = (sectionString: string): HomeCategorySection => {
  switch (sectionString) {
    case 'ELECTRIC_CATEGORIES':
      return HomeCategorySection.ELECTRIC_CATEGORIES;
    case 'GRID':
      return HomeCategorySection.GRID;
    case 'SHOP_BY_CATEGORY':
      return HomeCategorySection.SHOP_BY_CATEGORY;
    case 'DEALS':
      return HomeCategorySection.DEALS;
    default:
      return HomeCategorySection.ELECTRIC_CATEGORIES;
  }
};

const HomeCategory: React.FC<HomeCategoryProps> = ({ section }) => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useSelector((state: RootState) => state.homeCategorySlice);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<HomeCategoryType | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories
    .filter(cat => mapSectionStringToEnum(cat.section as unknown as string) === section)
    .filter(cat => 
      cat.name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );


  useEffect(() => {
    dispatch(getHomeCategories());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateClick = () => {
    setCreateDialogOpen(true);
    setEditedName('');
    setEditedImage(null);
    setPreviewImage('');
    setUploadError(null);
  };

  const handleCreateClose = () => {
    setCreateDialogOpen(false);
    setEditedName('');
    setEditedImage(null);
    setPreviewImage('');
    setUploadError(null);
  };

  const handleCreateSave = async () => {
    if (editedName && editedImage) {
      setUploadLoading(true);
      setUploadError(null);
      
      try {
        const imageUrl = await uploadToCloud(editedImage);
        
        const newCategory: CreateHomeCategoryRequest = {
          name: editedName,
          image: imageUrl,
          categoryId: `TEMP_${Date.now()}`,
          section: section
        };
        
        const result = await dispatch(createHomeCategories([newCategory])).unwrap();
        if (!result) throw new Error('Failed to create category');
        handleCreateClose();
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Upload failed');
      } finally {
        setUploadLoading(false);
      }
    }
};

  const handleEditClick = (category: HomeCategoryType) => {
    setSelectedCategory(category);
    setEditedName(category.name.toString());
    setPreviewImage(category.image);
    setEditDialogOpen(true);
    setUploadError(null);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
    setSelectedCategory(null);
    setEditedName('');
    setEditedImage(null);
    setPreviewImage('');
    setUploadError(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEditedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (selectedCategory) {
      setUploadLoading(true);
      setUploadError(null);
      
      try {
        let imageUrl = selectedCategory.image;
        
        if (editedImage !== null && editedImage !== undefined) {
          imageUrl = await uploadToCloud(editedImage);
        }
        
        const updatedCategory: HomeCategoryType = {
          ...selectedCategory,
          name: editedName,
          image: imageUrl,
          section: section
        };
        
        const result = await dispatch(updateHomeCategory({
          id: selectedCategory.id,
          category: updatedCategory
        })).unwrap();
        if (!result) throw new Error('Failed to update category');
        handleClose();
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Upload failed');
      } finally {
        setUploadLoading(false);
      }
    }
};

  const getSectionTitle = () => {
    switch (section) {
      case HomeCategorySection.GRID:
        return "Quản lý Grid";
      case HomeCategorySection.SHOP_BY_CATEGORY:
        return "Quản lý Shop By Category";
      case HomeCategorySection.ELECTRIC_CATEGORIES:
        return "Quản lý Electric Categories";
      case HomeCategorySection.DEALS:
        return "Quản lý Deals";
      default:
        return "Quản lý danh mục";
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          {getSectionTitle()}
        </Typography>
        <Tooltip title="Thêm mới">
          <Fab
            color="primary"
            size="small"
            onClick={handleCreateClick}
            sx={{ ml: 2 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Stack>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Tìm kiếm theo ID hoặc tên thể loại"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
              {filteredCategories
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
                        alt={category.name.toString()}
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
          count={filteredCategories.length}
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

      <Dialog 
        open={createDialogOpen} 
        onClose={handleCreateClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AddIcon fontSize="small" />
            <Typography variant="h6">
              Thêm thể loại mới
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
              required
            />
            
            <Box>
              <input
                accept="image/*"
                type="file"
                hidden
                id="create-image-input"
                onChange={handleImageChange}
                required
              />
              <label htmlFor="create-image-input">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ mb: 2 }}
                  disabled={uploadLoading}
                >
                  Chọn ảnh
                </Button>
              </label>
              
              {uploadError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {uploadError}
                </Alert>
              )}
              
              {previewImage && (
                <Box sx={{ mt: 2, position: 'relative', width: 'fit-content' }}>
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
          <Button 
            onClick={handleCreateClose} 
            startIcon={<Close />}
            disabled={uploadLoading}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleCreateSave} 
            variant="contained"
            startIcon={uploadLoading ? <CircularProgress size={20} /> : <Save />}
            disabled={!editedName.trim() || !editedImage || uploadLoading}
          >
            {uploadLoading ? 'Đang tải lên...' : 'Tạo mới'}
          </Button>
        </DialogActions>
      </Dialog>

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
                  disabled={uploadLoading}
                >
                  Chọn ảnh mới
                </Button>
              </label>
              
              {uploadError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {uploadError}
                </Alert>
              )}
              
              {previewImage && (
                <Box sx={{ mt: 2, position: 'relative', width: 'fit-content' }}>
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
          <Button 
            onClick={handleClose} 
            startIcon={<Close />}
            disabled={uploadLoading}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            startIcon={uploadLoading ? <CircularProgress size={20} /> : <Save />}
            disabled={!editedName.trim() || uploadLoading}
          >
            {uploadLoading ? 'Đang tải lên...' : 'Lưu'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomeCategory;