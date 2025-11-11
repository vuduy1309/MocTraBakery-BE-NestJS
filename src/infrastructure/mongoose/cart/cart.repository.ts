import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './cart.schema';
import { ICartRepository } from '../../../domain/cart/cart.repository';

@Injectable()
export class MongooseCartRepository implements ICartRepository {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async findByUserId(userId: string): Promise<any | null> {
    if (!Types.ObjectId.isValid(userId)) return null;
    return this.cartModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate({
        path: 'items.productId',
        select:
          'name images image description price sizes categoryId discountId origin isVegetarian isRefrigerated calories',
        populate: [
          { path: 'categoryId', select: 'name' },
          { path: 'discountId', select: 'name percent' },
        ],
      })
      .exec();
  }

  async create(data: any): Promise<any> {
    const doc = new this.cartModel(data);
    return doc.save();
  }

  async updateById(
    id: string,
    update: any,
    opts: any = { new: true },
  ): Promise<any | null> {
    return this.cartModel.findByIdAndUpdate(id, update, opts).exec();
  }

  async updateOne(filter: any, update: any): Promise<any> {
    return this.cartModel.updateOne(filter, update).exec();
  }

  async deleteOne(filter: any): Promise<any> {
    return this.cartModel.deleteOne(filter).exec();
  }
}
