import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("./category.schema").Category, {}> & import("./category.schema").Category & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
