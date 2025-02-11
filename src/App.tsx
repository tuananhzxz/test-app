import './App.css';
import { ThemeProvider } from '@mui/material';
import Navbar from './customer/components/navbar/Navbar';
import customtheme from './customtheme/customtheme';
import Home from './customer/pages/home/Home';
import Product from './customer/pages/product/Product';
import ProductDetails from "./customer/pages/pagedetails/ProductDetails";
import Cart from "./customer/pages/cart/Cart";
import Checkout from "./customer/pages/checkout/Checkout";
import Account from "./customer/pages/account/Account";
import {Route, Routes} from 'react-router-dom';
import Footer from "./customer/pages/footer/Footer";
import BecomeSeller from "./customer/pages/sellerregister/BecomeSeller";
import SellerDashBoard from './seller/pages/sellerhome/SellerDashBoard';
import AdminDashBoard from './admin/pages/AdminDashBoard';
import Auth from './customer/pages/login/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentSuccess from './customer/pages/PaymentSuccess';
import Wishlist from './customer/pages/wishlist/Wishlist';


function App() {

  return (
    <>
    <ThemeProvider theme={customtheme}>
        <div className="">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login-user" element={<Auth/>}/>
                <Route path="/products/:category" element={<Product />} />
                <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />
                <Route path="/account/*" element={<Account />} />
                <Route path="/become/seller" element={<BecomeSeller/>}/>
                <Route path="/seller/*" element={<SellerDashBoard/>} />
                <Route path="/admin/*" element={<AdminDashBoard/>} />
            </Routes>
            <Footer/>
        </div>
    </ThemeProvider>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
