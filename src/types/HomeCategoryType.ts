export interface HomeCategoryType {
    id : number;
    name : string;
    image : string;
    categoryId : string;
    section : HomeCategorySection;
    parentCategoryId? : string;
}

export enum HomeCategorySection {
    ELECTRIC_CATEGORIES,
    GRID,
    SHOP_BY_CATEGORY,
    DEALS
}

export interface Deal {
    id: number;
    discount: number;
    category: HomeCategoryType;
}

export interface Home {
    grid: HomeCategoryType[];
    shopByCategory: HomeCategoryType[];
    electricCategories: HomeCategoryType[];
    dealCategories: HomeCategoryType[];
    deals: Deal[];
}