import { Document, Types } from 'mongoose';
export type ProductDocument = Product & Document;
export declare class Product {
    name: string;
    description: string;
    price: number;
    images: string[];
    stock: number;
    isActive: boolean;
    origin?: string;
    categoryId: Types.ObjectId;
    discountId?: Types.ObjectId;
    createdBy: string;
    createdAt: Date;
    shelfLifeDays?: number;
    isRefrigerated?: boolean;
    isVegetarian?: boolean;
    calories?: number;
    includedFlavors?: string[];
    packaging?: any;
    sizes?: {
        name: string;
        price: number;
        stock: number;
    }[];
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, Document<unknown, any, Product, any> & Product & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, Document<unknown, {}, import("mongoose").FlatRecord<Product>, {}> & import("mongoose").FlatRecord<Product> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
