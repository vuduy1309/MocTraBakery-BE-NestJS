import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { IProductRepository } from '../../../domain/product/product.repository';

@Injectable()
export class MongooseProductRepository implements IProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(data: any): Promise<any> {
    const created = new this.productModel(data);
    return created.save();
  }

  async update(id: string, data: any): Promise<any | null> {
    if (data.$unset) {
      const unset = data.$unset;
      const setData = { ...data };
      delete setData.$unset;
      await this.productModel.updateOne(
        { _id: id },
        { $set: setData, $unset: unset },
      );
      return this.productModel
        .findById(id)
        .populate('categoryId')
        .populate('discountId')
        .exec();
    } else {
      return this.productModel
        .findByIdAndUpdate(id, data, { new: true })
        .populate('categoryId')
        .populate('discountId')
        .exec();
    }
  }

  async remove(id: string): Promise<any | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<any[]> {
    return this.productModel
      .find()
      .populate('categoryId')
      .populate('discountId')
      .exec();
  }

  async find(filter: any, projection: any = {}): Promise<any[]> {
    return this.productModel
      .find(filter, projection)
      .populate('categoryId')
      .populate('discountId')
      .exec();
  }

  async findById(id: string): Promise<any | null> {
    return this.productModel
      .findById(id)
      .populate('categoryId')
      .populate('discountId')
      .exec();
  }

  async countDocuments(): Promise<number> {
    return this.productModel.countDocuments().exec();
  }

  async findBestSellers(limit: number) {
    return this.productModel
      .find({ isActive: true })
      .sort({ stock: 1 })
      .limit(limit)
      .select('name stock')
      .exec();
  }

  async updateMany(ids: string[], update: any): Promise<any> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    return this.productModel
      .updateMany({ _id: { $in: objectIds } }, update)
      .exec();
  }

  async updateManyByFilter(filter: any, update: any): Promise<any> {
    return this.productModel.updateMany(filter, update).exec();
  }
}
