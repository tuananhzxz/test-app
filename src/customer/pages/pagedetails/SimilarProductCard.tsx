import React from 'react';
import {Button} from "@mui/material";
import {FavoriteBorderOutlined, ModeCommentOutlined, ShoppingCart, Star} from "@mui/icons-material";

const SimilarProductCard = () => {
    return (
        <div className="group w-[250px]"> {/* Changed to fixed width */}
            <div
                className="card relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
                    <img
                        className="card-media object-top"
                        src="https://img.freepik.com/premium-photo/beautiful-nursery-theme-art-cute-fox-pastel-colors_1110958-12363.jpg?semt=ais_hybrid"
                        alt="product"
                    />

                <div
                    className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold transform rotate-[-3deg] shadow-md">
                    -50%
                </div>

                <div
                    className="absolute top-4 right-4 bg-[#3f51b5] text-white px-3 py-1 rounded-lg text-sm font-bold transform rotate-[3deg] shadow-md">
                    HOT
                </div>
            </div>

            <div className="details w-full pt-3 space-y-2 group-hover-effect rounded-md bg-white p-4">
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} sx={{color: '#ffd700', fontSize: '16px'}}/>
                    ))}
                    <span className="text-sm text-gray-500 ml-1">(150)</span>
                </div>

                <div className="name">
                    <h1 className="text-lg font-semibold text-gray-800 hover:text-[#3f51b5] transition-colors">Hello</h1>
                    <p className="text-gray-600">Cutee hihi</p>
                </div>

                <div className="price flex items-center gap-3">
                  <span className="font-sans text-xl font-bold text-red-600">
                    400.000đ
                  </span>
                            <span className="line-through text-gray-400">
                    800.000đ
                  </span>
                            <span className="text-[#3f51b5] font-semibold">
                    50%
                 </span>
                </div>

                <button
                    className="w-full mt-2 py-2 bg-[#3f51b5] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors group">
                    <ShoppingCart className="group-hover:animate-bounce"/>
                    <span>Thêm vào giỏ</span>
                </button>
            </div>
        </div>
    );
}

export default SimilarProductCard;