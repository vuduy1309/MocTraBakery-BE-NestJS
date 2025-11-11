import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Discount } from './discount.schema';
import { IDiscountRepository } from '../../../domain/discount/discount.repository';

@Injectable()
export class MongooseDiscountRepository implements IDiscountRepository {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<Discount>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.discountModel.find().exec();
  }

  async findAllActive(): Promise<any[]> {
    return this.discountModel.find({ active: true }).exec();
  }

  async create(data: any): Promise<any> {
    return this.discountModel.create(data);
  }

  async update(id: string, data: any): Promise<any | null> {
    return this.discountModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<any | null> {
    return this.discountModel.findByIdAndDelete(id).exec();
  }

  async findById(id: string): Promise<any | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.discountModel.findById(id).exec();
  }
}
