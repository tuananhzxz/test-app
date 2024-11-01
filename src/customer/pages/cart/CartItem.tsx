import React from "react";
import {IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";

const CartItem = () => {
    return (
        <div className={`border rounded-md relative p-3`}>
            <div className={`flex gap-3`}>
                <div>
                    <img
                        className={`w-[80px] h-[80px] object-cover rounded-md`}
                        src="https://img.freepik.com/premium-photo/beautiful-nursery-theme-art-cute-fox-pastel-colors_1110958-12363.jpg?semt=ais_hybrid"
                        alt=""
                    />
                </div>
                <div className={`flex-1`}>
                    <div className={`flex justify-between items-start`}>
                        <h1 className={`font-semibold text-base`}>Product 1</h1>
                        <IconButton size="small" color="primary">
                            <Close fontSize="small"/>
                        </IconButton>
                    </div>

                    <div className={`mt-1 space-y-1`}>
                        <p className={`text-gray-400 text-xs`}>
                            <span className="font-medium">Người bán:</span> Tuấn Anh
                        </p>

                        <div className={`flex items-center justify-between`}>
                            <div className={`flex items-center gap-2`}>
                                <span className={`font-semibold text-red-600`}>200.000đ</span>
                                <span className={`line-through text-gray-400 text-sm`}>400.000đ</span>
                                <span className={`text-[#3f51b5] font-semibold text-sm`}>-50%</span>
                            </div>

                            <div className={`flex items-center gap-2`}>
                                <button className={`border rounded-md w-6 h-6 flex items-center justify-center hover:bg-gray-100`}>-</button>
                                <span className="w-6 text-center">1</span>
                                <button className={`border rounded-md w-6 h-6 flex items-center justify-center hover:bg-gray-100`}>+</button>
                            </div>
                        </div>

                        <div className={`flex items-center justify-between text-sm`}>
                            <p className={`text-gray-500`}>Số lượng: 5</p>
                            <p className={`text-gray-600 text-xs`}>7 ngày đổi trả</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;