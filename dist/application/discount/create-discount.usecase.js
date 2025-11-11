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
exports.CreateDiscountUseCase = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let CreateDiscountUseCase = class CreateDiscountUseCase {
    discountRepo;
    productRepo;
    constructor(discountRepo, productRepo) {
        this.discountRepo = discountRepo;
        this.productRepo = productRepo;
    }
    async execute(createDiscountDto) {
        const { productIds, ...discountData } = createDiscountDto;
        const discount = await this.discountRepo.create(discountData);
        if (productIds && Array.isArray(productIds) && productIds.length > 0) {
            await this.productRepo.updateMany(productIds, { $set: { discountId: discount._id } });
        }
        const products = productIds && productIds.length > 0
            ? await this.productRepo.find({ _id: { $in: productIds.map((id) => new mongoose_1.Types.ObjectId(id)) } }, { _id: 1, name: 1, images: 1 })
            : [];
        return {
            ...discount.toObject(),
            products,
        };
    }
};
exports.CreateDiscountUseCase = CreateDiscountUseCase;
exports.CreateDiscountUseCase = CreateDiscountUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IDiscountRepository')),
    __param(1, (0, common_1.Inject)('IProductRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateDiscountUseCase);
//# sourceMappingURL=create-discount.usecase.js.map