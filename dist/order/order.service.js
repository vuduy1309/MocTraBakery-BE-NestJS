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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./order.schema");
let OrderService = class OrderService {
    orderModel;
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async create(createOrderDto, userId) {
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
    async findById(orderId) {
        return this.orderModel.findById(orderId);
    }
    async markPaid(orderId) {
        return this.orderModel.findByIdAndUpdate(orderId, { status: 'paid' }, { new: true });
    }
    async findAll(filter = {}, options = {}) {
        const query = this.orderModel.find(filter).populate('userId', 'email');
        if (options.sort)
            query.sort(options.sort);
        if (options.limit)
            query.limit(options.limit);
        if (options.skip)
            query.skip(options.skip);
        return query.exec();
    }
    async updateStatus(orderId, status) {
        return this.orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrderService);
//# sourceMappingURL=order.service.js.map