import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Avatar,
  CircularProgress,
  Box
} from '@mui/material';
import { Edit, Trash2, Plus, Minus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../state/Store';
import { fetchSellerProducts } from '../../../state/seller/SellerProduct';
import { ProductSeller } from '../../../types/ProductType';

const ProductTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.sellerProduct.products);
  const loading = useAppSelector((state) => state.sellerProduct.loading);
  const error = useAppSelector((state) => state.sellerProduct.error);

  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    if (token) {
      dispatch(fetchSellerProducts(token));
    }
  }, [dispatch]);

  const handleStockChange = (productId: number, change: number) => {
    // Implement stock change logic
  };

  const formatPrice = (price: number | undefined): string => {
    return (price || 0).toLocaleString('vi-VN');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <div className="text-red-500">Error: {error}</div>
      </Box>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Quản lý sản phẩm</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={20} />
          Thêm sản phẩm
        </button>
      </div>
      
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="font-semibold">Mã SP</TableCell>
              <TableCell className="font-semibold">Hình ảnh</TableCell>
              <TableCell className="font-semibold">Tên sản phẩm</TableCell>
              <TableCell className="font-semibold">Giá bán</TableCell>
              <TableCell className="font-semibold">Kích thước</TableCell>
              <TableCell className="font-semibold">Kho</TableCell>
              <TableCell className="font-semibold">Danh mục</TableCell>
              <TableCell className="font-semibold">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: ProductSeller) => (
              <TableRow 
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">#{product.id}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {product.images && product.images.slice(0, 4).map((imageUrl, index) => (
                      <Avatar
                        key={index}
                        src={imageUrl}
                        alt={`${product.title}-${index}`}
                        variant="rounded"
                        className="w-12 h-12"
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <h3 className="font-medium">{product.title}</h3>
                    <div className="text-sm text-gray-500">
                      {product.images?.length || 0} ảnh
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-blue-600">
                      {formatPrice(product.sellingPrice)}đ
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(product.mrpPrice)}đ
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      -{product.discountPercent}%
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {product.sizes}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      onClick={() => product.id && handleStockChange(product.id, -1)}
                      disabled={!product.quantity || product.quantity <= 0}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Minus size={16} />
                    </IconButton>
                    <span className="min-w-[40px] text-center font-medium">
                      {product.quantity || 0}
                    </span>
                    <IconButton
                      size="small"
                      onClick={() => product.id && handleStockChange(product.id, 1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Plus size={16} />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {product.category?.name}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Tooltip title="Chỉnh sửa">
                      <IconButton 
                        size="small"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton 
                        size="small"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductTable;