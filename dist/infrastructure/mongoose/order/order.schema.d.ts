import { Document, Types } from 'mongoose';
export declare class Order extends Document {
    items: Array<{
        productId: Types.ObjectId;
        quantity: number;
        size?: string;
        name: string;
        price: number;
        discountPercent?: number;
        priceAfterDiscount?: number;
    }>;
    total: number;
    paymentMethod: string;
    address: string;
    phone: string;
    note?: string;
    deliveryTime: Date;
    status: string;
    userId: Types.ObjectId;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order, any> & Order & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>, {}> & import("mongoose").FlatRecord<Order> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
