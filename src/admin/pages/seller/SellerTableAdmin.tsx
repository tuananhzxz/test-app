import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  TextField,
  InputAdornment,
  Alert,
} from '@mui/material';
import {
  MoreVert,
  CheckCircle,
  Cancel,
  PauseCircle,
  LockClock,
  Block,
  Store,
  Search as SearchIcon,
} from '@mui/icons-material';
import { clearError, fetchAllSellers, updateSellerStatus } from '../../../state/admin/ManagerSeller';
import { RootState, useAppDispatch } from '../../../state/Store';

const statusMap = {
  PENDING_VERIFICATION: {
    label: 'Chờ xác minh',
    color: 'warning',
    icon: LockClock,
  },
  ACTIVE: {
    label: 'Hoạt động',
    color: 'success',
    icon: CheckCircle,
  },
  SUSPENDED: {
    label: 'Tạm ngưng',
    color: 'info',
    icon: PauseCircle,
  },
  DEACTIVATED: {
    label: 'Vô hiệu hóa',
    color: 'default',
    icon: Cancel,
  },
  BANNED: {
    label: 'Cấm',
    color: 'error',
    icon: Block,
  },
  CLOSED: {
    label: 'Đã đóng',
    color: 'default',
    icon: Store,
  },
} as const;

type StatusType = keyof typeof statusMap;

const SellerTableAdmin = () => {
  const dispatch = useAppDispatch();
  const { sellers, loading, error } = useSelector((state: RootState) => state.managerSeller);

  const [selectedStatus, setSelectedStatus] = useState<StatusType | 'PENDING_VERIFICATION'>('PENDING_VERIFICATION');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSeller, setSelectedSeller] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAllSellers(selectedStatus));
  }, [dispatch, selectedStatus]);

  const handleStatusFilter = (status: StatusType | 'PENDING_VERIFICATION') => {
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

  const handleStatusChange = async (newStatus: StatusType) => {
    if (selectedSeller) {
      await dispatch(updateSellerStatus({ id: selectedSeller, status: newStatus }));
      handleMenuClose();
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredSellers = sellers.filter((seller) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      seller.sellerName?.toLowerCase().includes(searchValue) ||
      seller.email?.toLowerCase().includes(searchValue) ||
      seller.phone?.toLowerCase().includes(searchValue) ||
      seller.businessDetails?.businessName?.toLowerCase().includes(searchValue)
    );
  });

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Quản lý người bán
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Paper elevation={0} sx={{ p: 2, flex: 1, backgroundColor: '#f8fafc' }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
            Lọc theo trạng thái
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
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
      </Stack>

      <Paper elevation={0} sx={{ p: 2, mb: 3, backgroundColor: '#f8fafc' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Tìm kiếm theo tên, email, số điện thoại hoặc tên doanh nghiệp..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: 'white',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'divider',
              },
            },
          }}
        />
      </Paper>

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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">Đang tải...</TableCell>
                </TableRow>
              ) : filteredSellers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Không có dữ liệu'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSellers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((seller) => {
                    const status = seller.accountStatus as StatusType;
                    const StatusIcon = statusMap[status].icon;
                    return (
                      <TableRow key={seller.id} hover>
                        <TableCell>{seller.sellerName}</TableCell>
                        <TableCell>{seller.email}</TableCell>
                        <TableCell>{seller.phone}</TableCell>
                        <TableCell>{seller.taxCode}</TableCell>
                        <TableCell>{seller.businessDetails?.businessName}</TableCell>
                        <TableCell>
                          <Chip
                            icon={<StatusIcon sx={{ fontSize: 16 }} />}
                            label={statusMap[status].label}
                            color={statusMap[status].color}
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
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          component="div"
          count={filteredSellers.length}
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
            onClick={() => handleStatusChange(status as StatusType)}
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
