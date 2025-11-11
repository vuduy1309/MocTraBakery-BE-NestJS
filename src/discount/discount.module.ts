import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Discount, DiscountSchema } from '../infrastructure/mongoose/discount/discount.schema';

import { DiscountController } from './discount.controller';
import { ProductModule } from '../product/product.module';
import { MongooseDiscountRepository } from '../infrastructure/mongoose/discount/discount.repository';
import { FindAllDiscountsUseCase } from '../application/discount/find-all-discounts.usecase';
import { FindAllActiveDiscountsUseCase } from '../application/discount/find-all-active-discounts.usecase';
import { CreateDiscountUseCase } from '../application/discount/create-discount.usecase';
import { UpdateDiscountUseCase } from '../application/discount/update-discount.usecase';
import { RemoveDiscountUseCase } from '../application/discount/remove-discount.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: Discount.name, schema: DiscountSchema }]), ProductModule],
  controllers: [DiscountController],
  providers: [
    MongooseDiscountRepository,
    { provide: 'IDiscountRepository', useClass: MongooseDiscountRepository },
    FindAllDiscountsUseCase,
    FindAllActiveDiscountsUseCase,
    CreateDiscountUseCase,
    UpdateDiscountUseCase,
    RemoveDiscountUseCase,
  ],
  exports: [
    FindAllDiscountsUseCase,
    FindAllActiveDiscountsUseCase,
    CreateDiscountUseCase,
    UpdateDiscountUseCase,
    RemoveDiscountUseCase,
  ],
})
export class DiscountModule {}
