import { IProductRepository } from '../../domain/product/product.repository';
export declare class CreateProductUseCase {
    private readonly repo;
    constructor(repo: IProductRepository);
    execute(data: any): Promise<any>;
}
