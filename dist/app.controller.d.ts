import { ProductService } from './product/product.service';
import { CategoryService } from './category/category.service';
import { DiscountService } from './discount/discount.service';
import { CommentService } from './comment/comment.service';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly productService;
    private readonly categoryService;
    private readonly discountService;
    private readonly commentService;
    constructor(appService: AppService, productService: ProductService, categoryService: CategoryService, discountService: DiscountService, commentService: CommentService);
    getHomepageData(): Promise<{
        featuredProducts: import("./product/product.schema").Product[];
        discounts: any[];
        reviews: (import("mongoose").Document<unknown, {}, import("./comment/comment.schema").Comment, {}> & import("./comment/comment.schema").Comment & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        promo: {
            content: string;
        };
    }>;
    getHello(): string;
}
