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
exports.MarkPaidUseCase = void 0;
const common_1 = require("@nestjs/common");
let MarkPaidUseCase = class MarkPaidUseCase {
    orderRepo;
    productRepo;
    constructor(orderRepo, productRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
    }
    async execute(orderId) {
        const order = await this.orderRepo.findById(orderId);
        if (order && order.items && Array.isArray(order.items)) {
            for (const item of order.items) {
                if (item.productId) {
                    try {
                        const result = await this.productRepo.update(item.productId.toString(), { $inc: { stock: -item.quantity } });
                        if (item.size) {
                            const product = result || (await this.productRepo.findById(item.productId.toString()));
                            if (product && Array.isArray(product.sizes)) {
                                const sizeIndex = product.sizes.findIndex((s) => s.name === item.size);
                                if (sizeIndex !== -1) {
                                    const sizeStockPath = `sizes.${sizeIndex}.stock`;
                                    await this.productRepo.update(item.productId.toString(), { $inc: { [sizeStockPath]: -item.quantity } });
                                }
                            }
                        }
                    }
                    catch (err) {
                    }
                }
            }
        }
        return this.orderRepo.findByIdAndUpdate(orderId, { status: 'paid' });
    }
};
exports.MarkPaidUseCase = MarkPaidUseCase;
exports.MarkPaidUseCase = MarkPaidUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IOrderRepository')),
    __param(1, (0, common_1.Inject)('IProductRepository')),
    __metadata("design:paramtypes", [Object, Object])
], MarkPaidUseCase);
//# sourceMappingURL=mark-paid.usecase.js.map