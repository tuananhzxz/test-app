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
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Delete,
  CheckCircle,
  TimerOff,
  Warning
} from '@mui/icons-material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

type CouponStatus = 'ACTIVE' | 'EXPIRED';

interface Coupon {
  id: string;
  code: string;
  startDate: Date;
  endDate: Date;
  minimumAmount: number;
  discountPercentage: number;
  status: CouponStatus;
}

const statusConfig = {
  ACTIVE: {
    label: 'Đang hoạt động',
    color: 'success' as const,
    icon: CheckCircle
  },
  EXPIRED: {
    label: 'Hết hạn',
    color: 'error' as const,
    icon: TimerOff
  }
};

// Mock data
const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'SUMMER2024',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-31'),
    minimumAmount: 1000000,
    discountPercentage: 15,
    status: 'ACTIVE'
  },
  {
    id: '2',
    code: 'SPRING2024',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-05-31'),
    minimumAmount: 500000,
    discountPercentage: 10,
    status: 'EXPIRED'
  },
  // Thêm mock data khác...
];

const CouponAdmin = () => {
  const [selectedStatus, setSelectedStatus] = useState<CouponStatus | 'ALL'>('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleStatusFilter = (status: CouponStatus | 'ALL') => {
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

  const handleDeleteClick = (couponId: string) => {
    setSelectedCoupon(couponId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Xử lý xóa coupon
    console.log('Deleting coupon:', selectedCoupon);
    setDeleteDialogOpen(false);
    setSnackbarOpen(true);
  };

  const filteredCoupons = selectedStatus === 'ALL'
    ? mockCoupons
    : mockCoupons.filter(coupon => coupon.status === selectedStatus);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Quản lý mã giảm giá
      </Typography>

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
          {(Object.keys(statusConfig) as CouponStatus[]).map((status) => {
            const { label, color, icon: Icon } = statusConfig[status];
            return (
              <Chip
                key={status}
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
                  const StatusIcon = statusConfig[coupon.status].icon;
                  return (
                    <TableRow key={coupon.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {coupon.code}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {format(coupon.startDate, 'dd/MM/yyyy', { locale: vi })}
                      </TableCell>
                      <TableCell>
                        {format(coupon.endDate, 'dd/MM/yyyy', { locale: vi })}
                      </TableCell>
                      <TableCell align="right">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(coupon.minimumAmount)}
                      </TableCell>
                      <TableCell align="right">
                        {coupon.discountPercentage}%
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={<StatusIcon sx={{ fontSize: 16 }} />}
                          label={statusConfig[coupon.status].label}
                          color={statusConfig[coupon.status].color}
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
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} của ${count}`
          }
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
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Hủy
          </Button>
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