import { FindAllCategoriesUseCase } from './application/category/find-all-categories.usecase';
import { FindAllActiveDiscountsUseCase } from './application/discount/find-all-active-discounts.usecase';
import { ListProductsUseCase } from './application/product/list-products.usecase';
import { FindAllCommentsUseCase } from './application/comment/find-all-comments.usecase';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly findAllCategoriesUseCase;
    private readonly listProductsUseCase;
    private readonly findActiveDiscountsUseCase;
    private readonly findAllCommentsUseCase;
    constructor(appService: AppService, findAllCategoriesUseCase: FindAllCategoriesUseCase, listProductsUseCase: ListProductsUseCase, findActiveDiscountsUseCase: FindAllActiveDiscountsUseCase, findAllCommentsUseCase: FindAllCommentsUseCase);
    getHomepageData(): Promise<{
        featuredProducts: any[];
        discounts: any[];
        reviews: any[];
        promo: {
            content: string;
        };
    }>;
    getHello(): string;
}
