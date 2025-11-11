import { IProductRepository } from '../../domain/product/product.repository';
export declare class ListProductsUseCase {
    private readonly repo;
    constructor(repo: IProductRepository);
    execute(): Promise<any[]>;
}
