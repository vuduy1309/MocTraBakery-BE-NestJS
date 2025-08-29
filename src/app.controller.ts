import { ProductService } from './product/product.service';
import { CategoryService } from './category/category.service';
import { DiscountService } from './discount/discount.service';
import { Controller, Get } from '@nestjs/common';
import { CommentService } from './comment/comment.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly discountService: DiscountService,
    private readonly commentService: CommentService,
  ) {}
  @Get('homepage-data')
  async getHomepageData() {
    const featuredProducts = await this.productService.findAll();
    const featured = featuredProducts.slice(0, 4);
    const discounts = await this.discountService.findAllActive();
    const reviews = await this.commentService.findAll(2);
    const promo = {
      content: 'Mua 2 bánh kem tặng 1 trà sữa! Áp dụng đến hết 30/6/2025.',
    };
    return {
      featuredProducts: featured,
      discounts,
      reviews,
      promo,
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
