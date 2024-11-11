import React from 'react';
import {Divider} from "@mui/material";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Order from "./Order";
import OrderDetails from "./OrderDetails";
import UserDetails from "./UserDetails";
import Address from "./Address";

const menu = [
    { name : "Đơn hàng", path: "/account/order" },
    { name : "Tài khoản", path: "/account/profile" },
    { name : "Thanh toán", path: "/account/payment" },
    { name : "Địa chỉ", path: "/account/addresses" },
    { name : "Đăng xuất", path: "/account/logout" },
]

const Account = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (item:any) => navigate(item.path);
    return (
        <div className={`px-5 lg:px-52 min-h-screen mt-10`}>
            <div>
                <h1 className={`text-xl font-bold pb-5`}>Tanh</h1>
            </div>

            <Divider/>

            <div className={`grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]`}>
                <section className={`col-span-1 lg:border-r lg:pr-5 py-5 h-full`}>
                    {
                        menu.map((item, index) => (
                            <div onClick={() => handleClick(item)} key={item.name}
                                 className={`
                                 ${location.pathname === item.path ? 'bg-primary-color text-white' : 'text-black'}
                                 py-3 mt-3 cursor-pointer hover:text-white hover:bg-primary-color px-5 rounded-md border-b`}>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                </section>
                <section className={`right lg:col-span-2 lg:pl-5 py-5`}>
                    <Routes>
                        <Route path='/profile' element={<UserDetails/>}/>
                        <Route path='/order' element={<Order/>}/>
                        <Route path='/order/:orderId/:orderItemId' element={<OrderDetails/>}/>
                        <Route path='/addresses' element={<Address/>}/>
                    </Routes>
                </section>
            </div>
        </div>
    );
}

export default Account;