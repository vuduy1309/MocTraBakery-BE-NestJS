"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("../product/product.schema");
const order_schema_1 = require("../order/order.schema");
const user_schema_1 = require("../user/user.schema");
let AdminService = class AdminService {
    productModel;
    orderModel;
    userModel;
    constructor(productModel, orderModel, userModel) {
        this.productModel = productModel;
        this.orderModel = orderModel;
        this.userModel = userModel;
    }
    async getStats() {
        const [totalProducts, totalOrders, totalCustomers] = await Promise.all([
            this.productModel.countDocuments(),
            this.orderModel.countDocuments(),
            this.userModel.countDocuments(),
        ]);
        const orders = await this.orderModel.find({ status: { $in: ['completed', 'paid'] } });
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], AdminService);
//# sourceMappingURL=admin.service.js.map