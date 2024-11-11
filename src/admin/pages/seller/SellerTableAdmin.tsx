import React, { useState } from 'react';
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import {
  MoreVert,
  CheckCircle,
  Cancel,
  PauseCircle,
  LockClock,
  Block,
  Store
} from '@mui/icons-material';

// Định nghĩa các trạng thái và màu sắc tương ứng
const statusMap = {
  PENDING_VERIFICATION: {
    label: 'Chờ xác minh',
    color: 'warning',
    icon: LockClock
  },
  ACTIVE: {
    label: 'Hoạt động',
    color: 'success',
    icon: CheckCircle
  },
  SUSPENDED: {
    label: 'Tạm ngưng',
    color: 'info',
    icon: PauseCircle
  },
  DEACTIVATED: {
    label: 'Vô hiệu hóa',
    color: 'default',
    icon: Cancel
  },
  BANNED: {
    label: 'Cấm',
    color: 'error',
    icon: Block
  },
  CLOSED: {
    label: 'Đã đóng',
    color: 'default',
    icon: Store
  },
} as const;

type StatusType = keyof typeof statusMap;

// Mock data
const mockData = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0987654321',
    taxCode: '0123456789',
    businessName: 'Shop ABC',
    status: 'ACTIVE' as StatusType,
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0987654322',
    taxCode: '0123456790',
    businessName: 'Shop XYZ',
    status: 'PENDING_VERIFICATION' as StatusType,
  },
  // Thêm data mẫu khác...
];

const SellerTableAdmin = () => {
  const [selectedStatus, setSelectedStatus] = useState<StatusType | 'ALL'>('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSeller, setSelectedSeller] = useState<number | null>(null);

  const handleStatusFilter = (status: StatusType | 'ALL') => {
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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, sellerId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedSeller(sellerId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSeller(null);
  };

  const filteredData = selectedStatus === 'ALL'
    ? mockData
    : mockData.filter(seller => seller.status === selectedStatus);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Quản lý người bán
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
          {Object.entries(statusMap).map(([status, { label, color, icon: Icon }]) => (
            <Chip
              key={status}
              label={label}
              icon={<Icon sx={{ fontSize: 16 }} />}
              onClick={() => handleStatusFilter(status as StatusType)}
              color={selectedStatus === status ? color : 'default'}
              variant={selectedStatus === status ? 'filled' : 'outlined'}
              sx={{
                '&:hover': { opacity: 0.9 },
                transition: 'all 0.2s',
              }}
            />
          ))}
        </Stack>
      </Paper>

      {/* Table */}
      <Paper elevation={1}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên người bán</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Mã số thuế</TableCell>
                <TableCell>Tên doanh nghiệp</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((seller) => {
                  const StatusIcon = statusMap[seller.status].icon;
                  return (
                    <TableRow key={seller.id} hover>
                      <TableCell>{seller.name}</TableCell>
                      <TableCell>{seller.email}</TableCell>
                      <TableCell>{seller.phone}</TableCell>
                      <TableCell>{seller.taxCode}</TableCell>
                      <TableCell>{seller.businessName}</TableCell>
                      <TableCell>
                        <Chip
                          icon={<StatusIcon sx={{ fontSize: 16 }} />}
                          label={statusMap[seller.status].label}
                          color={statusMap[seller.status].color}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(event) => handleMenuOpen(event, seller.id)}
                        >
                          <MoreVert />
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
          count={filteredData.length}
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

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {Object.entries(statusMap).map(([status, { label, icon: Icon }]) => (
          <MenuItem
            key={status}
            onClick={handleMenuClose}
            sx={{ gap: 1 }}
          >
            <Icon fontSize="small" />
            <Typography variant="body2">
              Chuyển sang {label.toLowerCase()}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SellerTableAdmin;