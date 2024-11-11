import React from 'react';
import OrderItem from "./OrderItem";

const Order = () => {
    return (
        <div className={`text-sm min-h-screen`}>
            <div className={`pb-5`}>
                <h1 className={`text-xl font-bold`}>Đơn hàng</h1>
            </div>
            <div className={`space-y-2`}>

                {[...Array(5)].map((_, index) => <OrderItem/>)}

            </div>
        </div>
    );
}

export default Order;