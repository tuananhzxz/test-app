import React from 'react';
import { ShoppingCart, Star } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { Product } from '../../../state/customer/ProductCustomerSlice';

interface SimilarProductCardProps {
  product: Product;
}

const SimilarProductCard: React.FC<SimilarProductCardProps> = ({ product }) => {
  const discountPercent = Math.round(
    ((product.mrpPrice - product.sellingPrice) / product.mrpPrice) * 100
  );

  return (
    <Link to={`/product-details/${product.category?.categoryId}/${encodeURIComponent(product.title)}/${product.id}`} className="group w-[250px]">
      <div className="card relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        <img
          className="card-media object-top h-[250px] w-full object-cover"
          src={product.images[0]}
          alt={product.title}
        />

        {discountPercent > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold transform rotate-[-3deg] shadow-md">
            -{discountPercent}%
          </div>
        )}

        {product.numRatings > 100 && (
          <div className="absolute top-4 right-4 bg-[#3f51b5] text-white px-3 py-1 rounded-lg text-sm font-bold transform rotate-[3deg] shadow-md">
            HOT
          </div>
        )}
      </div>

      <div className="details w-full pt-3 space-y-2 group-hover-effect rounded-md bg-white p-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              sx={{
                // color: star <= (product.rating || 0) ? '#ffd700' : '#e0e0e0', 
                fontSize: '16px'
              }}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">({product.numRatings || 0})</span>
        </div>

        <div className="name">
          <h1 className="text-lg font-semibold text-gray-800 hover:text-[#3f51b5] transition-colors">
            {product.title}
          </h1>
          <p className="text-gray-600 line-clamp-2">{product.description}</p>
        </div>

        <div className="price flex items-center gap-3">
          <span className="font-sans text-xl font-bold text-red-600">
            {product.sellingPrice.toLocaleString()}đ
          </span>
          {discountPercent > 0 && (
            <>
              <span className="line-through text-gray-400">
                {product.mrpPrice.toLocaleString()}đ
              </span>
              <span className="text-[#3f51b5] font-semibold">
                {discountPercent}%
              </span>
            </>
          )}
        </div>

        <button 
          className="w-full mt-2 py-2 bg-[#3f51b5] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors group"
          onClick={(e) => {
            e.preventDefault();
            // Add to cart logic here
          }}
        >
          <ShoppingCart className="group-hover:animate-bounce"/>
          <span>Thêm vào giỏ</span>
        </button>
      </div>
    </Link>
  );
};

export default SimilarProductCard;