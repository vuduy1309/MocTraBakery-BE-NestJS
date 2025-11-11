import { FindAllCategoriesUseCase } from './application/category/find-all-categories.usecase';
import { FindAllActiveDiscountsUseCase } from './application/discount/find-all-active-discounts.usecase';
import { ListProductsUseCase } from './application/product/list-products.usecase';
import { Controller, Get } from '@nestjs/common';
import { FindAllCommentsUseCase } from './application/comment/find-all-comments.usecase';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly findAllCategoriesUseCase: FindAllCategoriesUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly findActiveDiscountsUseCase: FindAllActiveDiscountsUseCase,
    private readonly findAllCommentsUseCase: FindAllCommentsUseCase,
  ) {}
  @Get('homepage-data')
  async getHomepageData() {
    const featuredProducts = await this.listProductsUseCase.execute();
    const featured = (featuredProducts || []).slice(0, 4);
    const discounts = await this.findActiveDiscountsUseCase.execute();
    const reviews = await this.findAllCommentsUseCase.execute(2);
    // (optional) fetch categories if needed
    // const categories = await this.findAllCategoriesUseCase.execute();
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
