import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Box, Button, CircularProgress, Divider, Modal, Rating, TextField } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../review/ReviewCard";
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../state/Store';
import { getProductById } from '../../../state/customer/ProductCustomerSlice';
import { ShareIcon } from 'lucide-react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CachedIcon from '@mui/icons-material/Cached';
import SecurityIcon from '@mui/icons-material/Security';
import { createReview, fetchReviewsByProductId, updateReview } from '../../../state/review/ReviewSlice';
import { Review } from '../../../types/ReviewType';

const ProductDetails = () => {
  const { productId } = useParams<{ 
    categoryId: string;
    title: string;
    productId: string;
  }>();
  
  const dispatch = useAppDispatch();
  const { selectedProduct: product, loading } = useAppSelector(state => state.product);
  const { reviews, loading: reviewLoading, error: reviewError } = useAppSelector(state => state.reviewSlice);

  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const averageRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(Number(productId)));
      dispatch(fetchReviewsByProductId(Number(productId)));
    }
  }, [dispatch, productId]);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const handleCreateReview = () => {
    if (productId) {
      if (editingReview) {
        dispatch(updateReview({
          reviewId: editingReview.id,
          reviewData: {
            reviewText,
            reviewRating,
            productImages: []
          }
        })).then(() => {
          resetReviewModal();
        });
      } else {
        // Create new review
        dispatch(createReview({
          productId: Number(productId),
          reviewData: {
            reviewText,
            reviewRating,
            productImages: []
          }
        })).then(() => {
          resetReviewModal();
        });
      }
    }
  };

  const resetReviewModal = () => {
    setIsReviewModalOpen(false);
    setReviewText('');
    setReviewRating(5);
    setEditingReview(null);
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setReviewText(review.reviewText);
    setReviewRating(review.rating);
    setIsReviewModalOpen(true);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Không tìm thấy sản phẩm</p>
      </div>
    );
  }

  const ReviewModal = () => (
    <Modal 
      open={isReviewModalOpen} 
      onClose={resetReviewModal}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
      }}>
        <h2 className="text-xl font-bold mb-4">
          {editingReview ? 'Chỉnh sửa đánh giá' : 'Viết đánh giá'}
        </h2>
        <div className="flex justify-center mb-4">
          {[1,2,3,4,5].map((star) => (
            <StarIcon
              key={star}
              className={`cursor-pointer ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-200'}`}
              onClick={() => setReviewRating(star)}
            />
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung đánh giá
          </label>
          <div className="w-full border rounded-md overflow-hidden">
          <textarea
            className="w-full p-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            rows={4}
            placeholder="Nhập đánh giá của bạn"
            value={reviewText}
            onChange={(e) => {
              e.preventDefault();
              setReviewText(e.target.value);
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.currentTarget.focus();
            }}
          />
          </div>
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handleCreateReview}
          disabled={!reviewText.trim()}
        >
          {editingReview ? 'Cập nhật' : 'Gửi đánh giá'}
        </Button>
      </Box>
    </Modal>
  );

  const discountPercent = Math.round(
    ((product.mrpPrice - product.sellingPrice) / product.mrpPrice) * 100
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section với breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-red-500">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${product.category?.id}`} className="hover:text-red-500">
              {product.category?.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section - Left Side */}
            <div className="p-8 border-r border-gray-100">
              <div className="sticky top-8">
                {/* Main Image with Zoom Effect */}
                <div className="relative group">
                  <div className="aspect-square overflow-hidden rounded-xl bg-gray-50">
                    <img
                      src={product.images[selectedImg]}
                      alt={product.title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-3 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors">
                      <FavoriteIcon className="text-red-500 w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors">
                      <ShareIcon className="text-blue-500 w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="mt-8">
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        className={`
                          flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden
                          ${selectedImg === index ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-200'}
                          hover:ring-2 hover:ring-red-400 transition-all
                        `}
                        onClick={() => setSelectedImg(index)}
                      >
                        <img
                          src={img}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info - Right Side */}
            <div className="p-8 space-y-6">
              {/* Title & Price Section */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {product.title}
                </h1>
                <div className="flex items-center gap-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-red-600">
                      {product.sellingPrice.toLocaleString()}đ
                    </span>
                    {discountPercent > 0 && (
                      <span className="text-lg text-gray-400 line-through">
                        {product.mrpPrice.toLocaleString()}đ
                      </span>
                    )}
                  </div>
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                      -{discountPercent}% Giảm
                    </span>
                  )}
                </div>
              </div>

              {/* Rating & Stock */}
              <div className="flex items-center justify-between py-4 border-y border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <Rating value={averageRating} readOnly precision={0.5} />
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviews.length || 0} đánh giá)
                  </span>
                </div>
                <div className="text-sm font-medium">
                  <span className="text-green-500">✓</span> Còn {product.quantity} sản phẩm
                </div>
              </div>

              {/* Variants Selection */}
              <div className="space-y-6">
                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Màu sắc
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.color.split(',').map((color, index) => (
                      <button
                        key={index}
                        className={`
                          px-4 py-2 rounded-full text-sm
                          border-2 border-transparent hover:border-red-500
                          focus:outline-none focus:border-red-500
                          transition-colors
                        `}
                      >
                        {color.trim()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Kích thước
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.split(',').map((size, index) => (
                      <button
                        key={index}
                        className={`
                          w-12 h-12 rounded-lg flex items-center justify-center
                          border-2 border-transparent hover:border-red-500
                          focus:outline-none focus:border-red-500
                          transition-colors text-sm font-medium
                        `}
                      >
                        {size.trim()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Số lượng
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        className="p-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <RemoveIcon className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button
                        className="p-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                        disabled={quantity >= product.quantity}
                      >
                        <AddIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-4">
                <button className="w-full py-4 bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition-colors">
                  <ShoppingCartIcon className="w-5 h-5" />
                  Thêm vào giỏ hàng
                </button>
                <button className="w-full py-4 border-2 border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition-colors">
                  Mua ngay
                </button>
              </div>

              {/* Product Features */}
              <div className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: LocalShippingIcon, text: "Giao hàng miễn phí" },
                    { icon: VerifiedUserIcon, text: "Bảo hành chính hãng" },
                    { icon: CachedIcon, text: "30 ngày đổi trả" },
                    { icon: SecurityIcon, text: "Thanh toán an toàn" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <feature.icon className="text-red-500 w-5 h-5" />
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Reviews section */}
      <div className={`pt-20`}>
        <ReviewCard 
          reviews={reviews} 
          onWriteReview={() => setIsReviewModalOpen(true)}
          onEditReview={handleEditReview}
        />
      </div>

      {/* Review Modal */}
      <ReviewModal />

      <div className={`mt-5 py-20`}>
      <h1 className={`text-lg font-bold mb-5`}>
        Sản phẩm tương tự
      </h1>
      <div className={`pt-5`}>
        {product.category?.id ? (
          <SimilarProduct
            categoryId={product.category.id}
            currentProductId={product.id}
          />
        ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="bg-gray-100 w-full h-48 rounded"/>
              <div className="mt-4 h-4 bg-gray-100 rounded"/>
              <div className="mt-2 h-4 bg-gray-100 rounded w-3/4"/>
              <div className="mt-4 h-10 bg-gray-100 rounded"/>
              </div>
        ))}
            </div>
          )}
        </div>
      </div>
      <Divider/>
    </div>
    </div>
  );
}

export default ProductDetails;