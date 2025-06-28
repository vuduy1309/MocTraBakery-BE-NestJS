

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discount } from './discount.schema';

@Injectable()
export class DiscountService {
  constructor(@InjectModel(Discount.name) private discountModel: Model<Discount>) {}

  async findAll() {
    return this.discountModel.find().exec();
  }

  async findAllActive() {
    return this.discountModel.find({ active: true }).exec();
  }
}
