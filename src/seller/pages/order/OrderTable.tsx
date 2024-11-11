import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Chip,
  Avatar,
  SelectChangeEvent,
} from '@mui/material';

type OrderStatus = 'PENDING' | 'PLACED' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

interface Product {
  image: string;
  title: string;
  price: number;
  color: string;
  shipping: string;
}

interface Delivery {
  name: string;
  address: string;
  phone: string;
}

interface Order {
  id: string;
  product: Product;
  delivery: Delivery;
  status: OrderStatus;
  createdAt: string;
}

const orderData: Order[] = [
  {
    id: "DH001",
    product: {
      image: "https://i.guim.co.uk/img/media/31e8a4f29cfa05815a0554102be993d41075828a/0_748_3263_2800/master/3263.jpg?width=620&quality=85&auto=format&fit=max&s=8759c6794bddb364c7e1c57da311db97",
      title: "Áo thun nam basic",
      price: 299000,
      color: "Trắng",
      shipping: "Express"
    },
    delivery: {
      name: "Nguyễn Văn A",
      address: "123 Nguyễn Huệ, Q.1, TP.HCM",
      phone: "0901234567"
    },
    status: "PENDING",
    createdAt: "2024-01-15"
  },
];

const statusColors: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PLACED: 'bg-blue-100 text-blue-800',
  CONFIRMED: 'bg-purple-100 text-purple-800',
  SHIPPED: 'bg-green-100 text-green-800',
  DELIVERED: 'bg-red-100 text-red-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

const statusText: Record<OrderStatus, string> = {
  PENDING: 'Chờ xác nhận',
  PLACED: 'Đang xử lý',
  CONFIRMED: 'Đã xác nhận',
  SHIPPED: 'Đã đưa đến điểm giao hàng',
  DELIVERED: 'Đã giao hàng',
  CANCELLED: 'Đã hủy',
};

const getStatusColor = (status: OrderStatus): string => {
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

const getStatusText = (status: OrderStatus): string => {
  return statusText[status] || status;
};

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(orderData);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Quản lý đơn hàng</h2>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="font-semibold">Mã đơn hàng</TableCell>
              <TableCell className="font-semibold">Sản phẩm</TableCell>
              <TableCell className="font-semibold">Địa chỉ giao hàng</TableCell>
              <TableCell className="font-semibold">Trạng thái</TableCell>
              <TableCell className="font-semibold">Cập nhật trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow 
                key={order.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Avatar
                      src={order.product.image}
                      alt={order.product.title}
                      className="w-16 h-16 rounded-lg"
                      variant="square"
                    />
                    <div>
                      <h3 className="font-medium">{order.product.title}</h3>
                      <p className="text-gray-600">
                        {order.product.price.toLocaleString('vi-VN')}đ
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500">
                          Màu: {order.product.color}
                        </span>
                        <span className="text-sm text-gray-500">
                          • {order.product.shipping}
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.delivery.name}</p>
                    <p className="text-gray-600">{order.delivery.address}</p>
                    <p className="text-gray-600">{order.delivery.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(order.status)}
                    className={`${getStatusColor(order.status)}`}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e: SelectChangeEvent) => 
                      handleStatusChange(order.id, e.target.value as OrderStatus)
                    }
                    size="small"
                    className="min-w-[150px]"
                  >
                    <MenuItem value="PENDING">Chờ xác nhận</MenuItem>
                    <MenuItem value="PLACED">Đang xử lý</MenuItem>
                    <MenuItem value="CONFIRMED">Đã xác nhận</MenuItem>
                    <MenuItem value="SHIPPED">Đã đưa đến điểm giao hàng</MenuItem>
                    <MenuItem value="DELIVERED">Đã giao hàng</MenuItem>
                    <MenuItem value="CANCELLED">Đã hủy</MenuItem> 
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderTable;