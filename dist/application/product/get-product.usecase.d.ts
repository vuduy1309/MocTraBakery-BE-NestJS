import { IProductRepository } from '../../domain/product/product.repository';
export declare class GetProductUseCase {
    private readonly repo;
    constructor(repo: IProductRepository);
    execute(id: string): Promise<any>;
}
