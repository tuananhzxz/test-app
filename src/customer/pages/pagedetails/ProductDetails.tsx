import React, { useState } from 'react';
import { red } from "@mui/material/colors";
import StarIcon from '@mui/icons-material/Star';
import { Divider } from "@mui/material";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SimilarProductCard from "./SimilarProductCard";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../review/ReviewCard";

const ProductDetails = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = [
    "https://img.freepik.com/premium-photo/beautiful-nursery-theme-art-cute-fox-pastel-colors_1110958-12363.jpg?semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/beautiful-nursery-theme-art-cute-fox-pastel-colors_1110958-12363.jpg?semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/beautiful-nursery-theme-art-cute-fox-pastel-colors_1110958-12363.jpg?semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/beautiful-nursery-theme-art-cute-fox-pastel-colors_1110958-12363.jpg?semt=ais_hybrid"
  ];

  return (
      <div className='px-5 lg:px-20 pt-10 bg-gray-50'>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">
          <section className={`flex flex-col lg:flex-row gap-5`}>
            <div className={`w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3`}>
              {images.map((img, index) => (
                  <div
                      key={index}
                      className={`relative w-1/4 lg:w-full rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 ${selectedImg === index ? 'ring-2 ring-red-500' : ''}`}
                      onClick={() => setSelectedImg(index)}
                  >
                    <img className={`w-full rounded-lg`} src={img} alt=""/>
                    {selectedImg === index && (
                        <div className="absolute inset-0 bg-black bg-opacity-10"/>
                    )}
                  </div>
              ))}
            </div>
            <div className={`w-full lg:w-[85%] relative group`}>
              <img
                  className={`w-full rounded-lg shadow-md transform transition-transform duration-500 group-hover:scale-105`}
                  src={images[selectedImg]}
                  alt=""
              />
              <button
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <FavoriteIcon className="text-red-500 hover:scale-110 transition-transform"/>
              </button>
            </div>
          </section>

          <section className={`space-y-6`}>
            <div className="space-y-2">
              <h1 className={`font-bold text-2xl text-gray-800 hover:text-red-500 transition-colors cursor-pointer`}>
                Sản phẩm 1
              </h1>
              <p className={`text-gray-600 leading-relaxed`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.
              </p>
            </div>

            <div className={`flex items-center space-x-4 bg-gray-50 p-3 rounded-lg`}>
              <div className={`flex items-center space-x-1`}>
                <span className="font-semibold">4.0</span>
                <StarIcon sx={{color: red[500]}}/>
              </div>
              <Divider orientation="vertical" flexItem/>
              <span className="text-gray-600">234 Đánh giá</span>
            </div>

            <div className="price-section bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-red-600">400.000đ</span>
                <span className="line-through text-gray-400">800.000đ</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md font-semibold">-50%</span>
              </div>
            </div>

            <div className={`space-y-4`}>
              {[
                "Đảm bảo chất lượng cho bạn",
                "100% Hoàn tiền nếu sản phẩm có lỗi",
                "Miễn phí vận chuyển & đổi trả",
                "Có thể thanh toán trực tiếp"
              ].map((text, index) => (
                  <div key={index}
                       className={`flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors`}>
                    <VerifiedUserIcon sx={{color: red[500]}}/>
                    <p className="text-gray-700">{text}</p>
                  </div>
              ))}
            </div>

            <div className="quantity-section">
              <h3 className="text-gray-700 font-semibold mb-2">Số lượng</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                      className="p-2 hover:bg-gray-100"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <RemoveIcon/>
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                      className="p-2 hover:bg-gray-100"
                      onClick={() => setQuantity(quantity + 1)}
                  >
                    <AddIcon/>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors transform hover:scale-105">
                <ShoppingCartIcon/>
                <span>Thêm vào giỏ</span>
              </button>
              <button
                  className="flex-1 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors transform hover:scale-105">
                Mua ngay
              </button>
            </div>

            <div className={`mt-5`}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo illo numquam reprehenderit ut?
              Corporis dolorum impedit labore natus repellat, soluta? Accusantium eaque eligendi ipsa minus perspiciatis
              possimus similique temporibus voluptatum?
            </div>
          </section>
        </div>

        <div className={`pt-20`}>
          <ReviewCard/>
        </div>

        <div className={`mt-5 py-20`}>
          <h1 className={`text-lg font-bold`}>
            Sản phẩm tương tự
          </h1>

          <div className={`pt-5`}>
            <SimilarProduct/>
          </div>
        </div>
        <Divider/>
      </div>
  )
}

export default ProductDetails;