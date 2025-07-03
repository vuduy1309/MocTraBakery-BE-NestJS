import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: any, userId: string) {
    // Snapshot từng item (lấy từ FE gửi lên)
    const items = createOrderDto.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      size: item.size,
      name: item.name,
      price: item.price,
      discountPercent: item.discountPercent,
      priceAfterDiscount: item.priceAfterDiscount,
    }));
    const order = new this.orderModel({
      ...createOrderDto,
      items,
      userId,
      status: 'pending',
    });
    return order.save();
  }

  async findById(orderId: string) {
    return this.orderModel.findById(orderId);
  }

  async markPaid(orderId: string) {
    return this.orderModel.findByIdAndUpdate(orderId, { status: 'paid' }, { new: true });
  }

  // Lấy tất cả đơn hàng, có thể filter theo status, user, search, phân trang
  async findAll(filter: Record<string, any> = {}, options: Record<string, any> = {}) {
    const query = this.orderModel.find(filter).populate('userId', 'email');
    if (options.sort) query.sort(options.sort);
    if (options.limit) query.limit(options.limit);
    if (options.skip) query.skip(options.skip);
    return query.exec();
  }

  async updateStatus(orderId: string, status: string) {
    return this.orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
  }
}
