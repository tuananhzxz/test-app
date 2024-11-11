import React from 'react';
import { Avatar, Chip } from "@mui/material";
import { LocalShipping, LocalOfferOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";

const OrderItem = () => {
    const navigate = useNavigate();
    return (
        <motion.div
            onClick={() => navigate('/account/order/1/1')}
            className="bg-white shadow-md rounded-lg overflow-hidden border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 mb-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="p-4 space-y-3">
                {/* Status Section */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                        <Avatar
                            sx={{
                                bgcolor: 'primary.main',
                                width: 48,
                                height: 48
                            }}
                        >
                            <LocalShipping fontSize="medium" />
                        </Avatar>

                        <div>
                            <h1 className="text-lg font-bold text-blue-700 tracking-wide uppercase">
                                Đang Giao Hàng
                            </h1>
                            <p className="text-gray-500 text-xs">
                                Dự kiến vào thứ 6, 1/11/2024
                            </p>
                        </div>
                    </div>

                    <Chip
                        icon={<LocalOfferOutlined />}
                        label="Miễn Phí"
                        color="primary"
                        variant="outlined"
                        size="small"
                    />
                </div>

                {/* Product Details */}
                <div className="flex space-x-4 bg-blue-50 p-3 rounded-lg">
                    <div className="flex-shrink-0">
                        <img
                            src="https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288883.jpg?semt=ais_hybrid"
                            alt="product"
                            className="w-32 h-32 object-cover rounded-lg shadow-md transform transition hover:scale-105"
                        />
                    </div>

                    <div className="flex-grow space-y-2">
                        <h2 className="text-xl font-bold text-gray-800">
                            Áo Thun Nam
                        </h2>

                        <p className="text-gray-600 text-sm line-clamp-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam blanditiis cum, dicta eius exercitationem.
                        </p>

                        <div className="flex items-center space-x-3">
                            <span className="text-xs text-gray-500">Số lượng: 1</span>
                            <span className="text-base font-semibold text-blue-600">
                                199,000 VNĐ
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default OrderItem;