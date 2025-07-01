import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { DiscountService } from './discount.service';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get()
  async findAll() {
    return this.discountService.findAll();
  }

  @Post()
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDiscountDto: any) {
    return this.discountService.update(id, updateDiscountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.discountService.remove(id);
  }
}
