import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, IconButton, Typography, Button, Stack,
  Avatar, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Tabs, Tab, FormControl, InputLabel, Select,
  InputAdornment
} from '@mui/material';
import {
  Edit, Delete, Save, Add, List,
  Search
} from '@mui/icons-material';
import { RootState, useAppDispatch } from '../../../state/Store';
import { Deal, HomeCategoryType } from '../../../types/HomeCategoryType';
import { createDeal, deleteDeal, getDeal, updateDeal } from '../../../state/admin/DealAdmin';
import { getHomeCategories } from '../../../state/admin/HomeCategorySlice';


// Tab Panel component remains the same
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  );
};

const DealAdmin = () => {
  const dispatch = useAppDispatch();
  const { deals, loading, error } = useSelector((state: RootState) => state.dealAdmin);
  const categories = useSelector((state: RootState) => state.homeCategorySlice.categories);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Deal | null>(null);

  // Form states
  const [dealDiscount, setDealDiscount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HomeCategoryType | null>(null);

  useEffect(() => {
    dispatch(getHomeCategories());
    dispatch(getDeal());
  }, [dispatch]);

  const filteredDeals = deals.filter(deal => 
    deal.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.discount.toString().includes(searchTerm)
  );

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

  const handleEdit = (deal: Deal) => {
    setSelectedItem(deal);
    setDealDiscount(deal.discount.toString());
    setSelectedCategory(deal.category);
    setEditDialogOpen(true);
  };

  const handleDelete = (deal: Deal) => {
    setSelectedItem(deal);
    setDeleteDialogOpen(true);
  };

  const handleCreateDeal = () => {
    if (selectedCategory && dealDiscount) {
      const newDeal: Deal = {
        id: deals.length + 1,
        discount: Number(dealDiscount),
        category: selectedCategory,
      };
      dispatch(createDeal(newDeal));
      setDealDiscount('');
      setSelectedCategory(null);
    }
  };

  const handleUpdateDeal = () => {
    if (selectedItem && selectedCategory && dealDiscount) {
      const updatedDeal: Deal = {
        ...selectedItem,
        discount: Number(dealDiscount),
        category: selectedCategory,
      };
      dispatch(updateDeal({ deal: updatedDeal, id: selectedItem.id }));
      setEditDialogOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      dispatch(deleteDeal(selectedItem.id));
      setDeleteDialogOpen(false);
    }
  };

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);
  
  const DealsTable = () => (
    <Box>
       <Box sx={{ mb: 2 }}>
        <TextField
          autoFocus
          fullWidth
          placeholder="Tìm kiếm theo tên thể loại hoặc % giảm giá"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </Box>
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
          {filteredDeals
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((deal, index) => (
              <TableRow hover key={deal.id}>
                <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <Avatar
                    src={deal.category.image}
                    variant="rounded"
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell>{deal.category.name}</TableCell>
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
        count={filteredDeals.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
      />
      </TableContainer>
    </Box>
  );

  const CreateDealForm = () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Tạo Deal mới
      </Typography>
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <TextField
          autoFocus
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
            value={selectedCategory?.id || ''}
            onChange={(e) => {
              const category = categories.find(cat => cat.id === e.target.value);
              setSelectedCategory(category || null);
            }}
            label="Thể loại"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleCreateDeal}
          disabled={!dealDiscount || !selectedCategory}
        >
          Tạo Deal
        </Button>
      </Stack>
    </Paper>
  );

  return (
    <Box sx={{ width: '100%' }}>
      {loading && <Typography>Đang tải...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<List />} label="Danh sách Deal" />
          <Tab icon={<Add />} label="Tạo Deal" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <DealsTable />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <CreateDealForm />
      </TabPanel>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Chỉnh sửa Deal</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
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
                value={selectedCategory?.id || ''}
                onChange={(e) => {
                  const category = categories.find(cat => cat.id === e.target.value);
                  setSelectedCategory(category || null);
                }}
                label="Thể loại"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleUpdateDeal}>Lưu</Button>
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
            Bạn có chắc chắn muốn xóa deal này không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DealAdmin;