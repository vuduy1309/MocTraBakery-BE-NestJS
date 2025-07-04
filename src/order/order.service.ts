import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';
import { ProductService } from '../product/product.service';
import { Inject, forwardRef } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject(forwardRef(() => ProductService)) private productService: ProductService,
  ) {}

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
    // Cập nhật trạng thái đơn hàng và trừ tồn kho sản phẩm
    const order = await this.orderModel.findById(orderId);
    if (order && order.items && Array.isArray(order.items)) {
      for (const item of order.items) {
        if (item.productId) {
          try {
            // Trừ stock tổng
            const result = await this.productService.update(item.productId.toString(), { $inc: { stock: -item.quantity } });
            // Trừ stock theo size nếu có size
            if (item.size) {
              // Lấy sản phẩm hiện tại để xác định index size
              const product = result || await this.productService.findById(item.productId.toString());
              if (product && Array.isArray(product.sizes)) {
                const sizeIndex = product.sizes.findIndex((s: any) => s.name === item.size);
                if (sizeIndex !== -1) {
                  const sizeStockPath = `sizes.${sizeIndex}.stock`;
                  const sizeResult = await this.productService.update(item.productId.toString(), { $inc: { [sizeStockPath]: -item.quantity } });
                  console.log('Update stock for product size', item.productId.toString(), item.size, 'quantity', item.quantity, 'result:', sizeResult);
                } else {
                  console.warn('Size not found for product', item.productId.toString(), item.size);
                }
              }
            }
            console.log('Update stock for product', item.productId.toString(), 'quantity', item.quantity, 'result:', result);
          } catch (err) {
            console.error('Error updating stock for product', item.productId.toString(), err);
          }
        }
      }
    }
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
