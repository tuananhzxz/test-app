import React, { useEffect, useState } from 'react';
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
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Snackbar,
  CircularProgress,
  TextField,
} from '@mui/material';
import {
  Delete,
  CheckCircle,
  TimerOff,
  Warning,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useAppDispatch } from '../../../state/Store';
import { useAppSelector } from '../../../state/Store';
import { deleteCoupon, fetchAllCoupons } from '../../../state/admin/CouponAdmin';


const statusConfig: Record<string, { label: string; color: 'success' | 'error'; icon: React.ElementType }> = {
  true: {
    label: 'Đang hoạt động',
    color: 'success',
    icon: CheckCircle,
  },
  false: {
    label: 'Hết hạn',
    color: 'error',
    icon: TimerOff,
  },
};

const CouponAdmin = () => {
  const dispatch = useAppDispatch();
  const { coupons, loading, error } = useAppSelector((state) => state.couponAdmin);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<boolean | 'ALL'>('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCoupons());
  }, [dispatch]);

  const handleStatusFilter = (status: boolean | 'ALL') => {
    setSelectedStatus(status);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (couponId: number) => {
    setSelectedCoupon(couponId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCoupon !== null) {
      dispatch(deleteCoupon(selectedCoupon))
        .unwrap()
        .then(() => {
          setSnackbarOpen(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setDeleteDialogOpen(false);
  };

  const filteredCoupons = coupons
  .filter((coupon) =>
    selectedStatus === 'ALL' ? true : coupon.isActive === selectedStatus
  )
  .filter((coupon) =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Quản lý mã giảm giá
      </Typography>

      <TextField
        label="Tìm kiếm mã giảm giá"
        variant="outlined"
        size="small"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Nhập mã giảm giá..."
        sx={{ mb: 3 }}
      />

      {/* Status Filter */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, backgroundColor: '#f8fafc' }}>
        <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
          Lọc theo trạng thái
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button
            variant={selectedStatus === 'ALL' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => handleStatusFilter('ALL')}
            sx={{ borderRadius: '16px' }}
          >
            Tất cả
          </Button>
          {['true', 'false'].map((key) => {
            const status = key === 'true';
            const { label, color, icon: Icon } = statusConfig[key];
            return (
              <Chip
                key={key}
                label={label}
                icon={<Icon sx={{ fontSize: 16 }} />}
                onClick={() => handleStatusFilter(status)}
                color={selectedStatus === status ? color : 'default'}
                variant={selectedStatus === status ? 'filled' : 'outlined'}
                sx={{
                  '&:hover': { opacity: 0.9 },
                  transition: 'all 0.2s',
                }}
              />
            );
          })}
        </Stack>
      </Paper>

      {/* Table */}
      <Paper elevation={1}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã giảm giá</TableCell>
                <TableCell>Ngày bắt đầu</TableCell>
                <TableCell>Ngày kết thúc</TableCell>
                <TableCell align="right">Đơn tối thiểu</TableCell>
                <TableCell align="right">Giảm giá</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCoupons
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((coupon) => {
                  const statusKey = coupon.isActive.toString();
                  const StatusIcon = statusConfig[statusKey].icon;
                  return (
                    <TableRow key={coupon.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {coupon.code}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {format(new Date(coupon.validityStartDate), 'dd/MM/yyyy', { locale: vi })}
                      </TableCell>
                      <TableCell>
                        {format(new Date(coupon.validityEndDate), 'dd/MM/yyyy', { locale: vi })}
                      </TableCell>
                      <TableCell align="right">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(coupon.minimumOrderValue)}
                      </TableCell>
                      <TableCell align="right">{coupon.discountPercentage}%</TableCell>
                      <TableCell>
                        <Chip
                          icon={<StatusIcon sx={{ fontSize: 16 }} />}
                          label={statusConfig[statusKey].label}
                          color={statusConfig[statusKey].color}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(coupon.id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredCoupons.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
        />
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Warning color="warning" />
            <Typography variant="h6">Xác nhận xóa</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa mã giảm giá này? Hành động này không thể hoàn tác.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Đã xóa mã giảm giá thành công!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CouponAdmin;
