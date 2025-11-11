export declare class ProductEntity {
    id: string | undefined;
    name: string;
    description?: string | undefined;
    price?: number | undefined;
    images?: string[] | undefined;
    stock?: number | undefined;
    isActive?: boolean | undefined;
    categoryId?: any | undefined;
    discountId?: any | undefined;
    createdBy?: string | undefined;
    createdAt?: Date | undefined;
    shelfLifeDays?: number | undefined;
    isRefrigerated?: boolean | undefined;
    isVegetarian?: boolean | undefined;
    calories?: number | undefined;
    includedFlavors?: string[] | undefined;
    packaging?: any | undefined;
    sizes?: any[] | undefined;
    origin?: string | undefined;
    constructor(id: string | undefined, name: string, description?: string | undefined, price?: number | undefined, images?: string[] | undefined, stock?: number | undefined, isActive?: boolean | undefined, categoryId?: any | undefined, discountId?: any | undefined, createdBy?: string | undefined, createdAt?: Date | undefined, shelfLifeDays?: number | undefined, isRefrigerated?: boolean | undefined, isVegetarian?: boolean | undefined, calories?: number | undefined, includedFlavors?: string[] | undefined, packaging?: any | undefined, sizes?: any[] | undefined, origin?: string | undefined);
}
