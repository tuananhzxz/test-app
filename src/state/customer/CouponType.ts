import { Cart } from "./CartSlice";

export interface Coupon {
    id: number;
    code: string;
    discountPercentage: number;
    validityStartDate: string;
    validityEndDate: string;
    minimumOderValue : number;
    active: boolean;
}

export interface CouponState {
    coupons : Coupon[];
    cart : Cart | null;
    loading : boolean;
    error : string | null;
    couponCreated : boolean;
    couponApplied : boolean;
}