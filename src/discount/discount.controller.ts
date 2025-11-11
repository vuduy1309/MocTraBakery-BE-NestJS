import { Controller, Get, Post, Body, Put, Param, Delete, Inject } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { FindAllDiscountsUseCase } from '../application/discount/find-all-discounts.usecase';
import { CreateDiscountUseCase } from '../application/discount/create-discount.usecase';
import { UpdateDiscountUseCase } from '../application/discount/update-discount.usecase';
import { RemoveDiscountUseCase } from '../application/discount/remove-discount.usecase';

@Controller('discounts')
export class DiscountController {
  constructor(
    private readonly findAllUseCase: FindAllDiscountsUseCase,
    private readonly createUseCase: CreateDiscountUseCase,
    private readonly updateUseCase: UpdateDiscountUseCase,
    private readonly removeUseCase: RemoveDiscountUseCase,
  ) {}

  @Get()
  async findAll() {
    return this.findAllUseCase.execute();
  }

  @Get('active')
  async findAllActive() {
    // expose a route to get active discounts
    return (await this.findAllUseCase.execute()).filter((d) => d.active);
  }

  @Post()
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.createUseCase.execute(createDiscountDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDiscountDto: any) {
    return this.updateUseCase.execute(id, updateDiscountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.removeUseCase.execute(id);
  }
}
