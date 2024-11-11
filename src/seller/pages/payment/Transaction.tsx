import React from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  TextField,
  MenuItem,
  Grid,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  AccountBalanceWallet as WalletIcon,
  CompareArrows as TransferIcon,
  Payments as PaymentsIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Transaction = () => {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Box className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <Box className="mb-8">
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="font-bold text-gray-800">
            Giao dịch
          </Typography>
          <Box className="flex gap-3">
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              className="border-gray-300"
            >
              Xuất Excel
            </Button>
            <Button
              variant="contained"
              startIcon={<FilterIcon />}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Lọc
            </Button>
          </Box>
        </Box>

        {/* Overview Cards */}
        <Grid container spacing={3} className="mb-8">
          <Grid item xs={12} md={4}>
            <Card className="p-6 hover:shadow-lg transition-all">
              <Box className="flex items-center justify-between mb-4">
                <Box className="p-2 bg-blue-100 rounded-full">
                  <WalletIcon className="text-blue-600" />
                </Box>
                <Chip label="Tuần này" size="small" className="bg-blue-50 text-blue-600" />
              </Box>
              <Typography className="text-gray-600 mb-2">
                Tổng giao dịch
              </Typography>
              <Typography variant="h4" className="font-bold mb-1">
                45,250,000đ
              </Typography>
              <Typography className="text-green-600 text-sm">
                +15.3% so với tuần trước
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="p-6 hover:shadow-lg transition-all">
              <Box className="flex items-center justify-between mb-4">
                <Box className="p-2 bg-green-100 rounded-full">
                  <TransferIcon className="text-green-600" />
                </Box>
                <Typography className="text-gray-500">24h qua</Typography>
              </Box>
              <Typography className="text-gray-600 mb-2">
                Số lượng giao dịch
              </Typography>
              <Typography variant="h4" className="font-bold mb-1">
                1,234
              </Typography>
              <Typography className="text-green-600 text-sm">
                +8.2% so với hôm qua
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="p-6 hover:shadow-lg transition-all">
              <Box className="flex items-center justify-between mb-4">
                <Box className="p-2 bg-purple-100 rounded-full">
                  <PaymentsIcon className="text-purple-600" />
                </Box>
                <Typography className="text-gray-500">Tháng này</Typography>
              </Box>
              <Typography className="text-gray-600 mb-2">
                Trung bình/giao dịch
              </Typography>
              <Typography variant="h4" className="font-bold mb-1">
                2,150,000đ
              </Typography>
              <Typography className="text-red-600 text-sm">
                -2.1% so với tháng trước
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Chart Section */}
        <Card className="p-6 mb-8">
          <Box className="flex justify-between items-center mb-6">
            <Typography variant="h6" className="font-bold">
              Biểu đồ giao dịch
            </Typography>
            <TextField
              select
              size="small"
              defaultValue="7days"
              className="w-40"
            >
              <MenuItem value="7days">7 ngày qua</MenuItem>
              <MenuItem value="30days">30 ngày qua</MenuItem>
              <MenuItem value="90days">90 ngày qua</MenuItem>
            </TextField>
          </Box>
          <Box className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <Box className="p-4 border-b">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Tìm kiếm giao dịch..."
                  InputProps={{
                    startAdornment: <SearchIcon className="text-gray-400 mr-2" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Trạng thái"
                  defaultValue="all"
                >
                  <MenuItem value="all">Tất cả</MenuItem>
                  <MenuItem value="success">Thành công</MenuItem>
                  <MenuItem value="pending">Đang xử lý</MenuItem>
                  <MenuItem value="failed">Thất bại</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Loại giao dịch"
                  defaultValue="all"
                >
                  <MenuItem value="all">Tất cả</MenuItem>
                  <MenuItem value="deposit">Nạp tiền</MenuItem>
                  <MenuItem value="withdraw">Rút tiền</MenuItem>
                  <MenuItem value="transfer">Chuyển khoản</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="flex gap-3">
                  <TextField
                    fullWidth
                    size="small"
                    label="Từ ngày"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Đến ngày"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Tabs 
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            className="px-4"
          >
            <Tab label="Tất cả giao dịch" />
            <Tab label="Nạp tiền" />
            <Tab label="Rút tiền" />
            <Tab label="Chuyển khoản" />
          </Tabs>
        </Card>

        {/* Transactions Table */}
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell>Mã giao dịch</TableCell>
                  <TableCell>Thông tin</TableCell>
                  <TableCell>Loại</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Thời gian</TableCell>
                  <TableCell align="right">Số tiền</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>
                      <Box className="flex items-center gap-3">
                        <Avatar src={transaction.avatar} />
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
                    <TableCell>
                      <Chip 
                        label={transaction.type}
                        size="small"
                        className={
                          transaction.type === 'Nạp tiền' 
                            ? 'bg-green-100 text-green-800'
                            : transaction.type === 'Rút tiền'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={transaction.status}
                        size="small"
                        className={
                          transaction.status === 'Thành công'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'Đang xử lý'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography className="font-medium">
                          {transaction.date}
                        </Typography>
                        <Typography className="text-sm text-gray-500">
                          {transaction.time}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        className={
                          transaction.type === 'Nạp tiền'
                            ? 'text-green-600 font-medium'
                            : transaction.type === 'Rút tiền'
                            ? 'text-red-600 font-medium'
                            : 'text-gray-900 font-medium'
                        }
                      >
                        {transaction.type === 'Nạp tiền' ? '+' : '-'}{transaction.amount}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" className="text-indigo-600">
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </Box>
  );
}

// Sample data
const chartData = [
  { date: '01/11', amount: 15000000 },
  { date: '02/11', amount: 25000000 },
  { date: '03/11', amount: 18000000 },
  { date: '04/11', amount: 32000000 },
  { date: '05/11', amount: 28000000 },
  { date: '06/11', amount: 45000000 },
  { date: '07/11', amount: 35000000 },
];

const transactions = [
  {
    id: 'TRX001',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    avatar: '/avatar1.jpg',
    type: 'Nạp tiền',
    status: 'Thành công',
    date: '04/11/2024',
    time: '15:30',
    amount: '1,500,000đ'
  },
  {
    id: 'TRX002',
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    avatar: '/avatar2.jpg',
    type: 'Rút tiền',
    status: 'Đang xử lý',
    date: '04/11/2024',
    time: '14:20',
    amount: '2,500,000đ'
  },
  {
    id: 'TRX003',
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    avatar: '/avatar3.jpg',
    type: 'Chuyển khoản',
    status: 'Thất bại',
    date: '04/11/2024',
    time: '09:15',
    amount: '3,750,000đ'
  },
];

export default Transaction;