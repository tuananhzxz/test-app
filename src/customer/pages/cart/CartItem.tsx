import React from "react";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useAppDispatch } from '../../../state/Store';
import { CartItem as CartItems, removeCartItem, updateCartItem } from '../../../state/customer/CartSlice';

interface CartItemProps {
    item: CartItems;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const dispatch = useAppDispatch();

    const handleQuantityChange = (change: number) => {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0 && newQuantity <= item.product.quantity) {
            dispatch(updateCartItem({ 
                cartItemId: item.id, 
                quantity: newQuantity 
            }));
        }
    };


    const handleRemoveItem = () => {
        dispatch(removeCartItem(item.id));
    };

    const discountPercent = Math.round(
        ((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100
    );

    return (
        <div className="border rounded-md relative p-3">
            <div className="flex gap-3">
                <div>
                    <img
                        className="w-[80px] h-[80px] object-cover rounded-md"
                        src={item.product.images[0]}
                        alt={item.product.title}
                    />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h1 className="font-semibold text-base">{item.product.title}</h1>
                        <IconButton size="small" color="primary" onClick={handleRemoveItem}>
                            <Close fontSize="small"/>
                        </IconButton>
                    </div>

                    <div className="mt-1 space-y-1">
                        <p className="text-gray-400 text-xs">
                            <span className="font-medium">Người bán:</span> {item.product.seller.sellerName}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-red-600">
                                    {item.sellingPrice.toLocaleString()}đ
                                </span>
                                {discountPercent > 0 && (
                                <span className="line-through text-gray-400 text-sm">
                                    {item.mrpPrice.toLocaleString()}đ
                                </span>
                                )}
                                {discountPercent > 0 && (
                                    <span className="text-[#3f51b5] font-semibold text-sm">
                                        -{discountPercent}%
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => handleQuantityChange(-1)}
                                    className="border rounded-md w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="w-6 text-center">{item.quantity}</span>
                                <button 
                                    onClick={() => handleQuantityChange(1)}
                                    className="border rounded-md w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <p className="text-gray-500">
                                Có sẵn: {item.product.quantity}
                            </p>
                            <p className="text-gray-600 text-xs">7 ngày đổi trả</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;