import React, { useState } from 'react';
import CartItem from "./CartItem";
import PricingCard from "./PricingCard";

const Cart = () => {
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const subtotal = 1000000;
    const shipping = 30000;

    const handleApplyCoupon = () => {
        if (couponCode === 'DISCOUNT10') {
            setDiscount(subtotal * 0.1);
        } else {
            setDiscount(0);
        }
    };

    return (
        <div className={`pt-10 px-5 sm:px-10 md:px-60 min-h-screen`}>
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5`}>
                <div className={`cartItemSection lg:col-span-2 space-y-3`}>
                    {[...Array(5)].map((_, index) => <CartItem key={index}/>)}
                </div>

                <div className={`col-span-1 text-sm space-y-3`}>
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
                                />
                                <button
                                    onClick={handleApplyCoupon}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Áp dụng
                                </button>
                            </div>
                        </div>

                        {/* Price Summary */}
                        <div><PricingCard/></div>

                        {/* Checkout Button */}
                        <button className="w-full bg-red-500 text-white py-3 rounded-md mt-4 hover:bg-red-600">
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;