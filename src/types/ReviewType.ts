import { Product } from "../state/customer/ProductCustomerSlice";
import { User } from "./UserType";

export interface Review {
    id: number;
    reviewText: string;
    rating : number;
    user : User;
    productImages: string[];
    product : Product
    createdDate: string;
}