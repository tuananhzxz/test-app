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
  Button,
  Stack,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Edit,
  Delete,
  Save,
  Add,
  Category,
  List
} from '@mui/icons-material';

interface Deal {
  id: string;
  image: string;
  category: string;
  discount: number;
}

interface Category {
  id: string;
  image: string;
  name: string;
}

// Mock data
const mockDeals: Deal[] = [
  {
    id: "1",
    image: "https://example.com/deal1.jpg",
    category: "Điện thoại",
    discount: 20
  },
  // Thêm deals khác...
];

const mockCategories: Category[] = [
  {
    id: "CAT1",
    image: "https://example.com/cat1.jpg",
    name: "Điện thoại"
  },
  // Thêm categories khác...
];

// Tab Panel
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const DealAdmin = () => {
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Deal | Category | null>(null);

  // State for create/edit deal
  const [dealDiscount, setDealDiscount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Deals Table
  const DealsTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" width={80}>STT</TableCell>
            <TableCell width={120}>Hình ảnh</TableCell>
            <TableCell>Thể loại</TableCell>
            <TableCell align="center">Giảm giá</TableCell>
            <TableCell align="right">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockDeals
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((deal, index) => (
              <TableRow hover key={deal.id}>
                <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <Avatar
                    src={deal.image}
                    variant="rounded"
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell>{deal.category}</TableCell>
                <TableCell align="center">{deal.discount}%</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEdit(deal)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(deal)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={mockDeals.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
      />
    </TableContainer>
  );

  // Categories Table
  const CategoriesTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" width={80}>STT</TableCell>
            <TableCell width={120}>ID</TableCell>
            <TableCell width={120}>Hình ảnh</TableCell>
            <TableCell>Thể loại</TableCell>
            <TableCell align="right">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockCategories
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((category, index) => (
              <TableRow hover key={category.id}>
                <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{category.id}</TableCell>
                <TableCell>
                  <Avatar
                    src={category.image}
                    variant="rounded"
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEdit(category)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={mockCategories.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
      />
    </TableContainer>
  );

  // Create Deal Form
  const CreateDealForm = () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Tạo Deal mới
      </Typography>
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <TextField
          label="Giảm giá (%)"
          type="number"
          value={dealDiscount}
          onChange={(e) => setDealDiscount(e.target.value)}
          InputProps={{
            inputProps: { min: 0, max: 100 }
          }}
        />
        <FormControl fullWidth>
          <InputLabel>Thể loại</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Thể loại"
          >
            {mockCategories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => {
            console.log('Creating deal:', { dealDiscount, selectedCategory });
          }}
          disabled={!dealDiscount || !selectedCategory}
        >
          Tạo Deal
        </Button>
      </Stack>
    </Paper>
  );

  const handleEdit = (item: Deal | Category) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };

  const handleDelete = (item: Deal | Category) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<List />} label="Danh sách Deal" />
          <Tab icon={<Category />} label="Các thể loại" />
          <Tab icon={<Add />} label="Tạo Deal" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <DealsTable />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <CategoriesTable />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <CreateDealForm />
      </TabPanel>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Chỉnh sửa</DialogTitle>
        <DialogContent>
          {/* Add edit form fields based on selected item type */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Hủy</Button>
          <Button variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa mục này không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
          <Button variant="contained" color="error">Xóa</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DealAdmin;