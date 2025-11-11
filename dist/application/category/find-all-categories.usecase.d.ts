import { ICategoryRepository } from '../../domain/category/category.repository';
export declare class FindAllCategoriesUseCase {
    private categoryRepo;
    constructor(categoryRepo: ICategoryRepository);
    execute(): Promise<any[]>;
}
