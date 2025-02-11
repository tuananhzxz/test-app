import React, { useState, useEffect } from 'react';
import CartItem from "./CartItem";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../state/Store';
import { applyCoupon, getUserCart } from '../../../state/customer/CartSlice';
import { CircularProgress } from '@mui/material';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { cart, loading,error } = useAppSelector(state => state.cart);
    const [couponCode, setCouponCode] = useState('');

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);

    const handleApplyCoupon = () => {
        if (!cart) return;
        dispatch(applyCoupon({
            code: couponCode,
            orderValue: cart.totalSellingPrice,
            apply: true
        }));
    };

    const handleRemoveCoupon = () => {
        if (!cart || !cart.couponCode) return;
        dispatch(applyCoupon({
            code: cart.couponCode,
            orderValue: cart.totalSellingPrice,
            apply: false
        }));
        setCouponCode('');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (!cart || cart.cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-semibold mb-4">Giỏ hàng trống</h2>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                >
                    Tiếp tục mua sắm
                </button>
            </div>
        );
    }

    return (
        <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="cartItemSection lg:col-span-2 space-y-3">
                    {cart.cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                <div className="col-span-1 text-sm space-y-3">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold text-lg mb-4">Tóm tắt đơn hàng</h3>

                        {/* Coupon Section */}
                        <div className="mb-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Nhập mã giảm giá"
                                className="flex-1 border rounded-md px-3 py-2"
                                disabled={loading}
                            />
                            {cart?.couponCode ? (
                                <button
                                    onClick={handleRemoveCoupon}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    disabled={loading}
                                >
                                    Xóa mã
                                </button>
                            ) : (
                        <button
                            onClick={handleApplyCoupon}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            disabled={loading || !couponCode}
                        >
                            Áp dụng
                        </button>
                    )}
                        </div>
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>

                        {/* Price Summary */}
                        <PricingCard 
                            totalMrpPrice={cart.totalMrpPrice}
                            totalSellingPrice={cart.totalSellingPrice}
                            discount={cart.discount}
                            currentPrice={cart.currentPrice}
                        />

                        {/* Checkout Button */}
                        <button 
                            onClick={() => navigate("/checkout")} 
                            className="w-full bg-red-500 text-white py-3 rounded-md mt-4 hover:bg-red-600"
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;