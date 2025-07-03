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
var OrderCleanupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCleanupService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./order.schema");
let OrderCleanupService = OrderCleanupService_1 = class OrderCleanupService {
    orderModel;
    logger = new common_1.Logger(OrderCleanupService_1.name);
    intervalId;
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    onModuleInit() {
        this.intervalId = setInterval(() => this.cleanupPendingVnpayOrders(), 60 * 1000);
    }
    async cleanupPendingVnpayOrders() {
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const result = await this.orderModel.deleteMany({
            paymentMethod: 'vnpay',
            status: 'pending',
            createdAt: { $lt: tenMinutesAgo },
        });
        if (result.deletedCount > 0) {
            this.logger.log(`Đã tự động xóa ${result.deletedCount} đơn hàng VNPAY pending quá 10 phút.`);
        }
    }
};
exports.OrderCleanupService = OrderCleanupService;
exports.OrderCleanupService = OrderCleanupService = OrderCleanupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrderCleanupService);
//# sourceMappingURL=order-cleanup.service.js.map