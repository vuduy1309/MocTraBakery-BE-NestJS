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
exports.UpdateItemQuantityUseCase = void 0;
const common_1 = require("@nestjs/common");
let UpdateItemQuantityUseCase = class UpdateItemQuantityUseCase {
    cartRepo;
    constructor(cartRepo) {
        this.cartRepo = cartRepo;
    }
    async execute(userId, productId, size, quantity) {
        if (quantity < 1)
            throw new Error('Số lượng phải lớn hơn 0');
        const cart = await this.cartRepo.findByUserId(userId);
        if (!cart)
            throw new Error('Cart không tồn tại');
        const idx = cart.items.findIndex((i) => i.productId.toString() === productId && i.size === size);
        if (idx === -1)
            throw new Error('Sản phẩm không có trong giỏ hàng');
        cart.items[idx].quantity = quantity;
        return cart.save();
    }
};
exports.UpdateItemQuantityUseCase = UpdateItemQuantityUseCase;
exports.UpdateItemQuantityUseCase = UpdateItemQuantityUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICartRepository')),
    __metadata("design:paramtypes", [Object])
], UpdateItemQuantityUseCase);
//# sourceMappingURL=update-item-quantity.usecase.js.map