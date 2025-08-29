import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Discount } from './discount.schema';
import { ProductService } from '../product/product.service';

@Injectable()

export class DiscountService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<Discount>,
    private productService: ProductService,
  ) {}

  async findAll(): Promise<any[]> {
    const discounts = await this.discountModel.find().exec();
    const result = await Promise.all(
      discounts.map(async (discount) => {
        const products = await this.productService['productModel']
          .find({ discountId: discount._id })
          .select('_id name images')
          .exec();
        return {
          ...discount.toObject(),
          products,
        };
      })
    );
    return result;
  }

  async findAllActive(): Promise<any[]> {
    const discounts = await this.discountModel.find({ active: true }).exec();
    const result = await Promise.all(
      discounts.map(async (discount) => {
        const products = await this.productService['productModel']
          .find({ discountId: discount._id })
          .select('_id name images')
          .exec();
        return {
          ...discount.toObject(),
          products,
        };
      })
    );
    return result;
  }
  async create(createDiscountDto: any): Promise<any> {
    const { productIds, ...discountData } = createDiscountDto;
    const discount = await this.discountModel.create(discountData);
    if (productIds && Array.isArray(productIds) && productIds.length > 0) {
      await this.productService['productModel'].updateMany(
        { _id: { $in: productIds.map((id: string) => new Types.ObjectId(id)) } },
        { $set: { discountId: discount._id } }
      );
    }
    const products = productIds && productIds.length > 0
      ? await this.productService['productModel']
          .find({ _id: { $in: productIds.map((id: string) => new Types.ObjectId(id)) } })
          .select('_id name images')
          .exec()
      : [];
    return {
      ...discount.toObject(),
      products,
    };
  }

  async update(id: string, updateDiscountDto: any): Promise<any> {
    const { productIds, ...discountData } = updateDiscountDto;
    const discount = await this.discountModel.findByIdAndUpdate(id, discountData, { new: true });
    if (!discount) throw new Error('Discount not found');
    await this.productService['productModel'].updateMany(
      { discountId: discount._id },
      { $unset: { discountId: '' } }
    );
    if (productIds && Array.isArray(productIds) && productIds.length > 0) {
      await this.productService['productModel'].updateMany(
        { _id: { $in: productIds.map((id: string) => new Types.ObjectId(id)) } },
        { $set: { discountId: discount._id } }
      );
    }
    const products = await this.productService['productModel']
      .find({ discountId: discount._id })
      .select('_id name images categoryId')
      .exec();
    return {
      ...discount.toObject(),
      products,
    };
  }

  async remove(id: string): Promise<any> {
    await this.productService['productModel'].updateMany(
      { discountId: new Types.ObjectId(id) },
      { $unset: { discountId: '' } }
    );
    return this.discountModel.findByIdAndDelete(id);
  }
}
