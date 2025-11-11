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
exports.AddToCartUseCase = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let AddToCartUseCase = class AddToCartUseCase {
    cartRepo;
    productRepo;
    constructor(cartRepo, productRepo) {
        this.cartRepo = cartRepo;
        this.productRepo = productRepo;
    }
    async execute(userId, productId, size, quantity) {
        const product = await this.productRepo.findById(productId);
        if (!product)
            throw new Error('Sản phẩm không tồn tại');
        let price = product.price;
        if (product.sizes && product.sizes.length > 0 && size) {
            const sizeObj = product.sizes.find((s) => s.name === size);
            if (sizeObj)
                price = sizeObj.price;
        }
        const cart = await this.cartRepo.findByUserId(userId);
        if (!cart) {
            return this.cartRepo.create({
                userId: new mongoose_1.Types.ObjectId(userId),
                items: [{ productId: new mongoose_1.Types.ObjectId(productId), size, quantity, price }],
            });
        }
        const idx = cart.items.findIndex((i) => i.productId.equals(productId) && i.size === size);
        if (idx > -1) {
            cart.items[idx].quantity += quantity;
            cart.items[idx].price = price;
        }
        else {
            cart.items.push({ productId: new mongoose_1.Types.ObjectId(productId), size, price, quantity });
        }
        return cart.save();
    }
};
exports.AddToCartUseCase = AddToCartUseCase;
exports.AddToCartUseCase = AddToCartUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICartRepository')),
    __param(1, (0, common_1.Inject)('IProductRepository')),
    __metadata("design:paramtypes", [Object, Object])
], AddToCartUseCase);
//# sourceMappingURL=add-to-cart.usecase.js.map