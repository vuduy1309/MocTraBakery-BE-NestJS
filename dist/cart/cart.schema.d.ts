import { Document, Types } from 'mongoose';
export declare class Cart extends Document {
    userId: Types.ObjectId;
    items: {
        productId: Types.ObjectId;
        size?: string;
        quantity: number;
        price: number;
    }[];
}
export declare const CartSchema: import("mongoose").Schema<Cart, import("mongoose").Model<Cart, any, any, any, Document<unknown, any, Cart, any> & Cart & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cart, Document<unknown, {}, import("mongoose").FlatRecord<Cart>, {}> & import("mongoose").FlatRecord<Cart> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
