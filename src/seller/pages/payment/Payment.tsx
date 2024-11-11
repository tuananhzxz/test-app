import React from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Card,
  IconButton,
  Chip,
  LinearProgress
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Payment = () => {
  return (
    <Box className="p-8 min-h-screen bg-gray-100">
      <Box className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <Typography variant="h4" className="font-bold text-gray-800 mb-4 md:mb-0">
          Thống kê thanh toán
        </Typography>
        <Button
          variant="contained"
          startIcon={<HistoryIcon />}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Xem lịch sử
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <Box className="flex justify-between items-start mb-4">
            <Box className="p-2 bg-green-100 rounded-lg">
              <AttachMoneyIcon className="text-green-600" />
            </Box>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Typography className="text-gray-600 mb-2">Tổng doanh thu</Typography>
          <Typography variant="h4" className="font-bold mb-2">
            15,750,000đ
          </Typography>
          <Box className="flex items-center text-green-600">
            <ArrowUpwardIcon fontSize="small" />
            <Typography variant="body2">+12.5% so với tháng trước</Typography>
          </Box>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <Box className="flex justify-between items-start mb-4">
            <Box className="p-2 bg-blue-100 rounded-lg">
              <TrendingUpIcon className="text-blue-600" />
            </Box>
            <Chip 
              label="Hôm nay" 
              color="primary" 
              size="small"
              className="bg-blue-600"
            />
          </Box>
          <Typography className="text-gray-600 mb-2">Giao dịch gần nhất</Typography>
          <Box className="space-y-2">
            <Typography variant="h5" className="font-bold">
              2,500,000đ
            </Typography>
            <Typography className="text-gray-500">
              04/11/2024 - 15:30
            </Typography>
          </Box>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <Typography className="text-gray-600 mb-4">Tỷ lệ thành công</Typography>
          <Box className="flex justify-between items-end mb-2">
            <Typography variant="h4" className="font-bold">98.5%</Typography>
            <Box className="flex items-center text-green-600">
              <ArrowUpwardIcon fontSize="small" />
              <Typography variant="body2">+2.1%</Typography>
            </Box>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={98.5} 
            className="h-2 rounded-full"
          />
        </Card>
      </Box>

      {/* Transactions Table */}
      <Card className="overflow-hidden">
        <Box className="p-6 border-b">
          <Typography variant="h6" className="font-bold">
            Lịch sử giao dịch gần đây
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell className="font-semibold">Ngày</TableCell>
                <TableCell className="font-semibold">Thông tin khách hàng</TableCell>
                <TableCell className="font-semibold">Order ID</TableCell>
                <TableCell className="font-semibold">Trạng thái</TableCell>
                <TableCell className="font-semibold">Số tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow 
                  key={transaction.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>
                    <Box>
                      <Typography className="font-medium">{transaction.date}</Typography>
                      <Typography className="text-sm text-gray-500">{transaction.time}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className="flex items-center gap-3">
                      <Avatar src={transaction.avatar} alt={transaction.name} />
                      <Box>
                        <Typography className="font-medium">
                          {transaction.name}
                        </Typography>
                        <Typography className="text-sm text-gray-500">
                          {transaction.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{transaction.orderId}</TableCell>
                  <TableCell>
                    <Chip 
                      label={transaction.status} 
                      color={transaction.status === 'Thành công' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography className={`font-medium ${transaction.type === 'receive' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'receive' ? '+' : '-'}{transaction.amount}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

const transactions = [
  {
    id: 1,
    date: '04/11/2024',
    time: '15:30',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    avatar: '/path-to-avatar.jpg',
    orderId: '#ORD001',
    status: 'Thành công',
    amount: '1,250,000đ',
    type: 'receive'
  },
  {
    id: 2,
    date: '04/11/2024',
    time: '14:20',
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    avatar: '/path-to-avatar.jpg',
    orderId: '#ORD002',
    status: 'Thành công',
    amount: '2,500,000đ',
    type: 'receive'
  },
  {
    id: 3,
    date: '03/11/2024',
    time: '09:15',
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    avatar: '/path-to-avatar.jpg',
    orderId: '#ORD003',
    status: 'Đã hủy',
    amount: '3,750,000đ',
    type: 'cancel'
  }
];

export default Payment;