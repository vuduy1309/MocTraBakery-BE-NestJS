import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/product/product.repository';
import { IOrderRepository } from '../../domain/order/order.repository';
import { IUserRepository } from '../../domain/user/user.repository';

@Injectable()
export class GetAdminStatsUseCase {
  constructor(
    @Inject('IProductRepository') private readonly productRepo: IProductRepository,
    @Inject('IOrderRepository') private readonly orderRepo: IOrderRepository,
    @Inject('IUserRepository') private readonly userRepo: IUserRepository,
  ) {}

  async execute() {
    const [totalProducts, totalOrders, totalCustomers] = await Promise.all([
      this.productRepo.countDocuments(),
      this.orderRepo.countDocuments(),
      this.userRepo.countDocuments({ role: 'Customer' }),
    ]);

    const orders = await this.orderRepo.find({}, { total: 1 });
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    const pipeline = [
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
    const bestSellers = await this.orderRepo.aggregate(pipeline as any);

    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 6);
    const revenueByDayAgg = await this.orderRepo.aggregate([
      { $match: { status: { $in: ['completed', 'paid'] }, createdAt: { $gte: weekAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$total' },
        },
      },
      { $sort: { _id: 1 } },
    ] as any);
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
