import { IDiscountRepository } from '../../domain/discount/discount.repository';
import { IProductRepository } from '../../domain/product/product.repository';
export declare class UpdateDiscountUseCase {
    private discountRepo;
    private productRepo;
    constructor(discountRepo: IDiscountRepository, productRepo: IProductRepository);
    execute(id: string, updateDiscountDto: any): Promise<any>;
}
