import { IProductRepository } from '../../domain/product/product.repository';
export declare class CountProductsUseCase {
    private readonly repo;
    constructor(repo: IProductRepository);
    execute(): Promise<number>;
}
