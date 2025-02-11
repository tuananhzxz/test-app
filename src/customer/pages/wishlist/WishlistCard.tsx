import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { Product } from '../../../state/customer/ProductCustomerSlice';
import { removeFromWishlist } from '../../../state/wishlist/WishListSlice';
import { useAppDispatch } from '../../../state/Store';
import { addItemToCart } from '../../../state/customer/CartSlice';

interface WishlistCardProps {
  product: Product;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const WishlistCard = ({ product }: WishlistCardProps) => {
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeSelector, setShowSizeSelector] = useState(false);

  const handleRemove = () => {
    dispatch(removeFromWishlist(product.id!));
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(addItemToCart({
        productId: product.id,
        size: selectedSize,
        quantity: 1
      })).unwrap();

      toast.success('Đã thêm vào giỏ hàng!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setSelectedSize('');
      setShowSizeSelector(false);

    } catch (error) {
      toast.error('Không thể thêm vào giỏ hàng!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const sizes = product.sizes ? product.sizes.split(',').map(size => size.trim()) : [];

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="relative aspect-w-4 aspect-h-3">
        <img
          src={product.images?.[0] || '/placeholder-image.jpg'}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {product.title}
          </h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {product.quantity !== undefined && (
          <p className="text-sm text-gray-600">
            Còn lại: {product.quantity} sản phẩm
          </p>
        )}

        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {product.color && (
          <p className="text-sm text-gray-600">
            Màu sắc: {product.color}
          </p>
        )}

        {sizes.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Kích thước:</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    selectedSize === size
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-end pt-2">
          <div className="space-y-1">
            <p className="text-lg font-bold text-blue-600">
              {formatCurrency(product.sellingPrice || 0)}
            </p>
            {product.mrpPrice && product.mrpPrice > (product.sellingPrice || 0) && (
              <p className="text-sm text-gray-400 line-through">
                {formatCurrency(product.mrpPrice)}
              </p>
            )}
            {product.discountPercent && product.discountPercent > 0 && (
              <p className="text-sm text-red-500">
                Giảm {product.discountPercent}%
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sizes.length > 0 && !selectedSize ? () => setShowSizeSelector(true) : handleAddToCart}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Thêm vào giỏ</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;