import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Discount, DiscountSchema } from './discount.schema';

import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Discount.name, schema: DiscountSchema }]), ProductModule],
  controllers: [DiscountController],
  providers: [DiscountService],
  exports: [DiscountService],
})
export class DiscountModule {}
