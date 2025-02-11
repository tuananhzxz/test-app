import React, { useEffect, useState } from 'react';
import OrderItem from "./OrderItem";
import { useAppDispatch, useAppSelector } from '../../../state/Store';
import { getUserOrders } from '../../../state/customer/OrderSlice';
import { Order as OrderType } from '../../../types/orderType';

const Order = () => {
    const dispatch = useAppDispatch();
    const order = useAppSelector((state) => state.order.orders);
    const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(getUserOrders());
    }, [dispatch]);

    useEffect(() => {
        setFilteredOrders(order);
    }, [order]);

    return (
        <div className={`text-sm min-h-screen`}>
            <div className={`pb-5`}>
                <h1 className={`text-xl font-bold`}>Đơn hàng</h1>
            </div>
            <div className="mb-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo mã đơn hàng, trạng thái hoặc tên sản phẩm..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={(e) => {
                            const searchTerm = e.target.value.toLowerCase();
                            const filteredOrders = order.filter(o => {
                                if (!o) return false;
                                
                                const orderIdMatch = o.orderId?.toLowerCase().includes(searchTerm) || false;
                                const statusMatch = o.orderStatus?.toLowerCase().includes(searchTerm) || false;
                                const productMatch = o.orderItems?.some(item => 
                                    item?.product?.title?.toLowerCase().includes(searchTerm) ||
                                    item?.product.description.toLowerCase().includes(searchTerm)
                                ) || false;

                                return orderIdMatch || statusMatch || productMatch;
                            });
                            setFilteredOrders(filteredOrders);
                        }}
                    />
                    <input 
                        type="date"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={(e) => {
                            const searchDate = new Date(e.target.value).toLocaleDateString('vi-VN', {
                                weekday: 'long',
                                year: 'numeric', 
                                month: 'long',
                                day: 'numeric'
                            });
                            const filteredOrders = order.filter(o => {
                                if (!o || !o.orderDate) return false;
                                const orderDate = new Date(o.orderDate).toLocaleDateString('vi-VN', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                });
                                return orderDate === searchDate;
                            });
                            setFilteredOrders(filteredOrders);
                        }}
                    />
                </div>
            </div>

            <div className={`space-y-2`}>
                {filteredOrders
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((order, index) => <OrderItem key={index} order={order}/>)
                }
            </div>

            <div className="mt-4 flex justify-center">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50"
                    >
                        Trước
                    </button>
                    
                    <span className="px-4 py-2">
                        Trang {currentPage} / {Math.ceil(filteredOrders.length / itemsPerPage)}
                    </span>

                    <button
                        onClick={() => setCurrentPage(prev => 
                            Math.min(prev + 1, Math.ceil(filteredOrders.length / itemsPerPage))
                        )}
                        disabled={currentPage >= Math.ceil(filteredOrders.length / itemsPerPage)}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50"
                    >
                        Sau
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Order;