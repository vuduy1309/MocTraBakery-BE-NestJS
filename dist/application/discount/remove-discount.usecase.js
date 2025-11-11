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
exports.RemoveDiscountUseCase = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let RemoveDiscountUseCase = class RemoveDiscountUseCase {
    discountRepo;
    productRepo;
    constructor(discountRepo, productRepo) {
        this.discountRepo = discountRepo;
        this.productRepo = productRepo;
    }
    async execute(id) {
        await this.productRepo.updateManyByFilter({ discountId: new mongoose_1.Types.ObjectId(id) }, { $unset: { discountId: '' } });
        return this.discountRepo.remove(id);
    }
};
exports.RemoveDiscountUseCase = RemoveDiscountUseCase;
exports.RemoveDiscountUseCase = RemoveDiscountUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IDiscountRepository')),
    __param(1, (0, common_1.Inject)('IProductRepository')),
    __metadata("design:paramtypes", [Object, Object])
], RemoveDiscountUseCase);
//# sourceMappingURL=remove-discount.usecase.js.map