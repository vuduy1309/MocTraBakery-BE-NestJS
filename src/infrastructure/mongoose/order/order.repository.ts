import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Order } from './order.schema';
import { IOrderRepository } from '../../../domain/order/order.repository';

@Injectable()
export class MongooseOrderRepository implements IOrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async countDocuments(filter: any = {}): Promise<number> {
    return this.orderModel.countDocuments(filter).exec();
  }

  async find(filter: any, projection: any = {}): Promise<any[]> {
    return this.orderModel.find(filter, projection).exec();
  }

  async aggregate(pipeline: PipelineStage[]): Promise<any[]> {
    return this.orderModel.aggregate(pipeline as any).exec();
  }

  async create(data: any): Promise<any> {
    const doc = new this.orderModel(data);
    return doc.save();
  }

  async findById(id: string): Promise<any | null> {
    return this.orderModel.findById(id).exec();
  }

  async findByIdAndUpdate(
    id: string,
    update: any,
    opts: any = { new: true },
  ): Promise<any | null> {
    return this.orderModel.findByIdAndUpdate(id, update, opts).exec();
  }

  async findByIdAndDelete(id: string): Promise<any | null> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }

  async deleteMany(filter: any): Promise<{ deletedCount?: number }> {
    const result = await this.orderModel.deleteMany(filter).exec();
    // Mongoose DeleteResult type may vary; normalize to object with deletedCount
    return { deletedCount: (result as any)?.deletedCount || 0 };
  }
}
