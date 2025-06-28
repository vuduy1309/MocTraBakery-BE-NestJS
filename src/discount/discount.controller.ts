import { Controller, Get } from '@nestjs/common';
import { DiscountService } from './discount.service';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get()
  async getAll() {
    return this.discountService.findAll();
  }
}
