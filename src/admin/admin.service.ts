import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Product } from '../product/product.schema';
import { Order } from '../order/order.schema';
import { User } from '../user/user.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getStats() {
    const [totalProducts, totalOrders, totalCustomers] = await Promise.all([
      this.productModel.countDocuments(),
      this.orderModel.countDocuments(),
      this.userModel.countDocuments(),
    ]);

    const orders = await this.orderModel.find({ status: { $in: ['completed', 'paid'] } });
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    const pipeline: PipelineStage[] = [
      { $unwind: { path: '$items' } },
      { $group: { _id: '$items.product', totalSold: { $sum: '$items.quantity' } } },
      { $sort: { totalSold: -1 } },
      { $limit: 4 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: { path: '$product' } },
      { $project: { name: '$product.name', stock: '$product.stock' } },
    ];
    const bestSellers = await this.orderModel.aggregate(pipeline);

    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 6);
    const revenueByDayAgg = await this.orderModel.aggregate([
      { $match: { status: { $in: ['completed', 'paid'] }, createdAt: { $gte: weekAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$total' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const revenueByDay = Array(7).fill(0).map((_, i) => {
      const d = new Date(weekAgo);
      d.setDate(weekAgo.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      const found = revenueByDayAgg.find(r => r._id === key);
      return { date: days[i], revenue: found ? found.revenue : 0 };
    });

    return {
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue,
      bestSellers,
      revenueByDay,
    };
  }
}
