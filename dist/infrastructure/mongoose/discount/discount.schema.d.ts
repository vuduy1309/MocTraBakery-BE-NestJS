import { Document } from 'mongoose';
export declare class Discount extends Document {
    name: string;
    percent: number;
    description?: string;
    active?: boolean;
}
export declare const DiscountSchema: import("mongoose").Schema<Discount, import("mongoose").Model<Discount, any, any, any, Document<unknown, any, Discount, any> & Discount & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Discount, Document<unknown, {}, import("mongoose").FlatRecord<Discount>, {}> & import("mongoose").FlatRecord<Discount> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
