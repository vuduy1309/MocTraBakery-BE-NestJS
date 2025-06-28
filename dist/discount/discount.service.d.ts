import { Model } from 'mongoose';
import { Discount } from './discount.schema';
export declare class DiscountService {
    private discountModel;
    constructor(discountModel: Model<Discount>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Discount, {}> & Discount & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findAllActive(): Promise<(import("mongoose").Document<unknown, {}, Discount, {}> & Discount & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
