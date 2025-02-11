import { ProfileSeller } from "./ProfileSeller";

export interface ProductSeller {
    id?: number;
    title?: string;
    description?: string;
    mrpPrice?: number;
    sellingPrice?: number;
    discountPercent?: number;
    quantity?: number;
    color?: string;
    images?: string[];
    numRatings?: number;
    category? : Category
    seller? : ProfileSeller;
    createdDate: string;
    sizes: string;
  }

  interface Category {
    id? : number;
    name : string;
    categoryId: string;
    parentCategory? : Category; 
    level: number;
  }