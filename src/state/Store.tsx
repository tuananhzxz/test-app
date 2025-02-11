import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sellerSlice from './seller/SellerSlice';
import sellerProductSlice from './seller/SellerProduct';
import productSlice from './customer/ProductCustomerSlice';
import productSimilarSlice from './customer/SimilarProduct';
import authSlice from './customer/AuthSliceCus';
import cartSlice from './customer/CartSlice';
import orderSlice from './customer/OrderSlice';
import managerSellerSlice from './admin/ManagerSeller';
import couponSlice from './admin/CouponAdmin';
import homeCategorySlice from './admin/HomeCategorySlice';
import dealAdminSlice from './admin/DealAdmin';
import WishlistSlice from './wishlist/WishListSlice';
import sellerOrderSlice from './seller/SellerOrderSlice';
import reviewSlice from './review/ReviewSlice';

const rootReducer = combineReducers({
  couponAdmin : couponSlice,
  seller: sellerSlice,
  sellerProduct : sellerProductSlice,
  product: productSlice,
  productSimilar: productSimilarSlice,
  auth : authSlice,
  cart: cartSlice,
  order : orderSlice,
  managerSeller : managerSellerSlice,
  homeCategorySlice : homeCategorySlice,
  dealAdmin : dealAdminSlice,
  wishlist : WishlistSlice,
  sellerOrderSlice : sellerOrderSlice,
  reviewSlice : reviewSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;