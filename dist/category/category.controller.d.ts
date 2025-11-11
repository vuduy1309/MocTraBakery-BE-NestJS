import { FindAllCategoriesUseCase } from '../application/category/find-all-categories.usecase';
export declare class CategoryController {
    private readonly findAllCategoriesUseCase;
    constructor(findAllCategoriesUseCase: FindAllCategoriesUseCase);
    getAll(): Promise<any[]>;
}
