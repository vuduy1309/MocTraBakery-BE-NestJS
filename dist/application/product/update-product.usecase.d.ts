import { IProductRepository } from '../../domain/product/product.repository';
export declare class UpdateProductUseCase {
    private readonly repo;
    constructor(repo: IProductRepository);
    execute(id: string, data: any): Promise<any>;
}
