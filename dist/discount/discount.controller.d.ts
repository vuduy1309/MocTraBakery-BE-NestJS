import { DiscountService } from './discount.service';
export declare class DiscountController {
    private readonly discountService;
    constructor(discountService: DiscountService);
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("./discount.schema").Discount, {}> & import("./discount.schema").Discount & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
