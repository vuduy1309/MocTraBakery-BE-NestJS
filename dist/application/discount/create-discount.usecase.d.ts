import { IDiscountRepository } from '../../domain/discount/discount.repository';
import { IProductRepository } from '../../domain/product/product.repository';
export declare class CreateDiscountUseCase {
    private discountRepo;
    private productRepo;
    constructor(discountRepo: IDiscountRepository, productRepo: IProductRepository);
    execute(createDiscountDto: any): Promise<any>;
}
