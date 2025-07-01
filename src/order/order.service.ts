import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: any, userId: string) {
    const order = new this.orderModel({
      ...createOrderDto,
      userId,
      status: 'pending',
    });
    return order.save();
  }
}
