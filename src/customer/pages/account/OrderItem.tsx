import React from 'react';
import { Avatar, Chip } from "@mui/material";
import { LocalShipping, LocalOfferOutlined, AccessTime, ShoppingCart, ThumbUpAlt, CancelOutlined, CheckCircleOutline } from "@mui/icons-material";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";
import { Order } from '../../../types/orderType';
interface OrderInfo {
    order : Order;
}
const OrderItem : React.FC<OrderInfo> = ({ order }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            onClick={() => navigate(`/account/order/${order.id}/${order.orderItems.map((item) => item.id)}`)}
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
                                bgcolor: order.orderStatus === 'CANCELLED' ? 'error.main' :
                                        order.orderStatus === 'DELIVERED' ? 'success.main' :
                                        order.orderStatus === 'SHIPPED' ? 'info.main' :
                                        order.orderStatus === 'CONFIRMED' ? 'warning.main' :
                                        order.orderStatus === 'PLACED' ? 'secondary.main' : 'primary.main',
                                width: 48,
                                height: 48
                            }}
                        >
                            {order.orderStatus === 'CANCELLED' && <CancelOutlined fontSize="medium" />}
                            {order.orderStatus === 'DELIVERED' && <CheckCircleOutline fontSize="medium" />}
                            {order.orderStatus === 'SHIPPED' && <LocalShipping fontSize="medium" />}
                            {order.orderStatus === 'CONFIRMED' && <ThumbUpAlt fontSize="medium" />}
                            {order.orderStatus === 'PLACED' && <ShoppingCart fontSize="medium" />}
                            {order.orderStatus === 'PENDING' && <AccessTime fontSize="medium" />}
                        </Avatar>

                        <div>
                            <h1 className="text-lg font-bold text-blue-700 tracking-wide uppercase">
                                {order.orderStatus === 'PENDING' && 'Chờ Xác Nhận'}
                                {order.orderStatus === 'PLACED' && 'Đã Đặt Hàng'}
                                {order.orderStatus === 'CONFIRMED' && 'Đã Xác Nhận'} 
                                {order.orderStatus === 'SHIPPED' && 'Đang Giao Hàng'}
                                {order.orderStatus === 'DELIVERED' && 'Đã Giao Hàng'}
                                {order.orderStatus === 'CANCELLED' && 'Đã Hủy'}
                            </h1>
                            <p className="text-gray-500 text-xs">
                                Dự kiến vào {new Date(order.deliveryDate).toLocaleDateString('vi-VN', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long', 
                                    day: 'numeric'
                                })}
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
                    <div className="flex-shrink-0 relative">
                        <div className="relative w-32 h-32">
                            {order.orderItems.map((item, index) => (
                                <img
                                    key={index}
                                    src={item.product.images[0] || "https://img.lovepik.com/bg/20240504/transportation-and-delivery-of-company-orders-3d-rendered-image-of_8832911_wh860.jpg!/fw/860"}
                                    alt={item.product.title}
                                    className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-md transform transition hover:scale-105 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                                />
                            ))}
                        </div>
                        {order.orderItems.length > 1 && (
                            <div className="grid grid-cols-2 gap-1 absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full">
                                {order.orderItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-14 h-14 rounded-md overflow-hidden border border-white"
                                    >
                                        <img 
                                            src={item.product.images[0]} 
                                            alt={item.product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex-grow space-y-2">
                        <h2 className="text-xl font-bold text-gray-800">
                            { order.orderItems.map((item) => (
                                item.product.title
                            )).join(', ')}
                        </h2>

                        <p className="text-gray-600 text-sm line-clamp-2">
                            { order.orderItems.map((item) => (
                                item.product.description
                            ))}
                        </p>

                        <div className="flex items-center space-x-3">
                            <span className="text-xs text-gray-500">Số lượng: {order.totalItem || 1}</span>
                            <span className="text-base font-semibold text-blue-600">
                                {order.totalSellingPrice?.toLocaleString('vi-VN')} VNĐ
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default OrderItem;