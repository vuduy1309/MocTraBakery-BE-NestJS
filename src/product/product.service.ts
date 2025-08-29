import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async update(id: string, data: any): Promise<Product | null> {
    if (data.$unset) {
      const unset = data.$unset;
      const setData = { ...data };
      delete setData.$unset;
      await this.productModel.updateOne({ _id: id }, { $set: setData, $unset: unset });
      return this.productModel.findById(id)
        .populate('categoryId')
        .populate('discountId')
        .exec();
    } else {
      return this.productModel.findByIdAndUpdate(id, data, { new: true })
        .populate('categoryId')
        .populate('discountId')
        .exec();
    }
  }

  async remove(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel
      .find()
      .populate('categoryId')
      .populate('discountId')
      .exec();
  }

  async findById(id: string): Promise<Product | null> {
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

  async create(data: any): Promise<Product> {
    const created = new this.productModel(data);
    return created.save();
  }
}
