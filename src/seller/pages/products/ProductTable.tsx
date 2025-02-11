import React, { useEffect, useState } from 'react';
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
  Box,
  TextField,
  InputAdornment,
  TablePagination
} from '@mui/material';
import { Edit, Trash2, Plus, Minus, Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../state/Store';
import { fetchSellerProducts, updateProduct, deleteProduct } from '../../../state/seller/SellerProduct';
import { ProductSeller } from '../../../types/ProductType';
import { useNavigate } from 'react-router-dom';
import EditProductDialog from './EditProductDialog';

const ProductTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.sellerProduct.products);
  const loading = useAppSelector((state) => state.sellerProduct.loading);
  const error = useAppSelector((state) => state.sellerProduct.error);
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState<ProductSeller | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    if (token) {
      dispatch(fetchSellerProducts(token));
    }
  }, [dispatch]);

  const handleEdit = (product: ProductSeller) => {
    setEditingProduct(product);
  };

  const handleStockChange = async (product: ProductSeller, change: number) => {
    if (!product.id) return;
    
    const newQuantity = (product.quantity || 0) + change;
    if (newQuantity < 0) return;

    const updateRequest = {
      id: product.id,
      request: {
        title: product.title || '',
        description: product.description || '',
        mrpPrice: product.mrpPrice || 0,
        sellingPrice: product.sellingPrice || 0,
        quantity: newQuantity,
        color: product.color || '',
        images: product.images || [],
        category: product.category?.name || '',
        category2: product.category?.name || '',
        category3: product.category?.name || '',
        sizes: product.sizes || ''
      }
    };

    try {
      await dispatch(updateProduct(updateRequest)).unwrap();
    } catch (error) {
      console.error('Failed to update stock:', error);
    }
  };

  const handleDelete = async (productId: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    try {
      await dispatch(deleteProduct({ id: productId })).unwrap();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const formatPrice = (price: number | undefined): string => {
    return (price || 0).toLocaleString('vi-VN');
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get current page data
  const paginatedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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

  const emptyRows = page > 0
    ? Math.max(0, (1 + page) * rowsPerPage - filteredProducts.length)
    : 0;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Quản lý sản phẩm</h2>
        <button onClick={() => navigate("/seller/add-product")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={20} />
          Thêm sản phẩm
        </button>
      </div>

      <div className="mb-6">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm sản phẩm theo tên..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} className="text-gray-500" />
              </InputAdornment>
            ),
          }}
          className="bg-white"
        />
      </div>
      
      <Paper className="shadow-lg">
        <TableContainer>
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
              {paginatedProducts.map((product: ProductSeller) => (
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
                        onClick={() => handleStockChange(product, -1)}
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
                        onClick={() => handleStockChange(product, 1)}
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
                          onClick={() => handleEdit(product)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton 
                          size="small"
                          onClick={() => product.id && handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 73 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} trong ${count}`
          }
        />
      </Paper>
      <EditProductDialog
        open={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        product={editingProduct}
      />
    </div>
  );
};

export default ProductTable;