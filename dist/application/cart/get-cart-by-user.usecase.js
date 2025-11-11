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
exports.GetCartByUserUseCase = void 0;
const common_1 = require("@nestjs/common");
let GetCartByUserUseCase = class GetCartByUserUseCase {
    cartRepo;
    constructor(cartRepo) {
        this.cartRepo = cartRepo;
    }
    async execute(userId) {
        const cart = await this.cartRepo.findByUserId(userId);
        if (!cart)
            return { items: [], total: 0 };
        let total = 0;
        const items = cart.items.map((item) => {
            const prod = item.productId && typeof item.productId === 'object' ? item.productId : null;
            let discountPercent = 0;
            if (prod && prod.discountId && typeof prod.discountId === 'object' && prod.discountId.percent) {
                discountPercent = prod.discountId.percent;
            }
            const priceAfterDiscount = discountPercent ? Math.round(item.price * (1 - discountPercent / 100)) : item.price;
            total += priceAfterDiscount * item.quantity;
            return {
                productId: prod
                    ? {
                        _id: prod._id,
                        name: prod.name,
                        images: prod.images,
                        image: prod.image,
                        description: prod.description,
                        price: prod.price,
                        sizes: prod.sizes,
                        origin: prod.origin,
                        isVegetarian: prod.isVegetarian,
                        isRefrigerated: prod.isRefrigerated,
                        calories: prod.calories,
                        category: prod.categoryId && typeof prod.categoryId === 'object' ? prod.categoryId.name : prod.categoryId,
                        discount: prod.discountId && typeof prod.discountId === 'object' ? { name: prod.discountId.name, percent: prod.discountId.percent } : prod.discountId,
                    }
                    : null,
                size: item.size,
                quantity: item.quantity,
                price: item.price,
                priceAfterDiscount,
                discountPercent,
            };
        });
        return { items, total };
    }
};
exports.GetCartByUserUseCase = GetCartByUserUseCase;
exports.GetCartByUserUseCase = GetCartByUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICartRepository')),
    __metadata("design:paramtypes", [Object])
], GetCartByUserUseCase);
//# sourceMappingURL=get-cart-by-user.usecase.js.map