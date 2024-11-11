import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ThemeProvider } from '@mui/material';
import Navbar from './customer/components/navbar/Navbar';
import customtheme from './customtheme/customtheme';
import Home from './customer/pages/home/Home';
import Product from './customer/pages/product/Product';
import ProductDetails from "./customer/pages/pagedetails/ProductDetails";
import Review from "./customer/pages/review/Review";
import Cart from "./customer/pages/cart/Cart";
import Checkout from "./customer/pages/checkout/Checkout";
import Account from "./customer/pages/account/Account";
import {Route, Routes} from 'react-router-dom';
import Footer from "./customer/pages/footer/Footer";
import BecomeSeller from "./customer/pages/sellerregister/BecomeSeller";
import SellerDashBoard from './seller/pages/sellerhome/SellerDashBoard';
import AdminDashBoard from './admin/pages/AdminDashBoard';
import { fetchSellerProfile } from './state/seller/SellerSlice';
import { useAppDispatch } from './state/Store';

function App() {

  return (
    <ThemeProvider theme={customtheme}>
        <div className="">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:category" element={<Product />} />
                <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/account/*" element={<Account />} />
                <Route path="/become/seller" element={<BecomeSeller/>}/>
                <Route path="/seller/*" element={<SellerDashBoard/>} />
                <Route path="/admin/*" element={<AdminDashBoard/>} />
            </Routes>
            <Footer/>
        </div>
    </ThemeProvider>
    
  );
}

export default App;
