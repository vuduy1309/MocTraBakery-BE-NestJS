import { Model } from 'mongoose';
import { Discount } from './discount.schema';
import { ProductService } from '../product/product.service';
export declare class DiscountService {
    private discountModel;
    private productService;
    constructor(discountModel: Model<Discount>, productService: ProductService);
    findAll(): Promise<any[]>;
    findAllActive(): Promise<any[]>;
    create(createDiscountDto: any): Promise<any>;
    update(id: string, updateDiscountDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
