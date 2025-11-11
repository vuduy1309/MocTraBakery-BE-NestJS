import { IProductRepository } from '../../domain/product/product.repository';
export declare class FindBestSellersUseCase {
    private readonly repo;
    constructor(repo: IProductRepository);
    execute(limit: number): Promise<any[]>;
}
