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
  // API: GET /homepage-data
  @Get('homepage-data')
  async getHomepageData() {
    // Lấy 3 sản phẩm nổi bật (có thể chọn theo tiêu chí khác)
    const featuredProducts = await this.productService.findAll();
    const featured = featuredProducts.slice(0, 3);
    // Lấy các discount đang active
    const discounts = await this.discountService.findAllActive ? await this.discountService.findAllActive() : await this.discountService.findAll();
    // Lấy review động từ comment collection
    const reviews = await this.commentService.findAll(2);
    // Lấy 1 promo mẫu (cứng)
    const promo = { content: 'Mua 2 bánh kem tặng 1 trà sữa! Áp dụng đến hết 30/6/2025.' };
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
