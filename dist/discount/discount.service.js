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
exports.DiscountService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const discount_schema_1 = require("./discount.schema");
const product_service_1 = require("../product/product.service");
let DiscountService = class DiscountService {
    discountModel;
    productService;
    constructor(discountModel, productService) {
        this.discountModel = discountModel;
        this.productService = productService;
    }
    async findAll() {
        const discounts = await this.discountModel.find().exec();
        const result = await Promise.all(discounts.map(async (discount) => {
            const products = await this.productService['productModel']
                .find({ discountId: discount._id })
                .select('_id name images')
                .exec();
            return {
                ...discount.toObject(),
                products,
            };
        }));
        return result;
    }
    async findAllActive() {
        const discounts = await this.discountModel.find({ active: true }).exec();
        const result = await Promise.all(discounts.map(async (discount) => {
            const products = await this.productService['productModel']
                .find({ discountId: discount._id })
                .select('_id name images')
                .exec();
            return {
                ...discount.toObject(),
                products,
            };
        }));
        return result;
    }
    async create(createDiscountDto) {
        const { productIds, ...discountData } = createDiscountDto;
        const discount = await this.discountModel.create(discountData);
        if (productIds && Array.isArray(productIds) && productIds.length > 0) {
            await this.productService['productModel'].updateMany({ _id: { $in: productIds.map((id) => new mongoose_2.Types.ObjectId(id)) } }, { $set: { discountId: discount._id } });
        }
        const products = productIds && productIds.length > 0
            ? await this.productService['productModel']
                .find({ _id: { $in: productIds.map((id) => new mongoose_2.Types.ObjectId(id)) } })
                .select('_id name images')
                .exec()
            : [];
        return {
            ...discount.toObject(),
            products,
        };
    }
    async update(id, updateDiscountDto) {
        const { productIds, ...discountData } = updateDiscountDto;
        const discount = await this.discountModel.findByIdAndUpdate(id, discountData, { new: true });
        if (!discount)
            throw new Error('Discount not found');
        await this.productService['productModel'].updateMany({ discountId: discount._id }, { $unset: { discountId: '' } });
        if (productIds && Array.isArray(productIds) && productIds.length > 0) {
            await this.productService['productModel'].updateMany({ _id: { $in: productIds.map((id) => new mongoose_2.Types.ObjectId(id)) } }, { $set: { discountId: discount._id } });
        }
        const products = await this.productService['productModel']
            .find({ discountId: discount._id })
            .select('_id name images categoryId')
            .exec();
        return {
            ...discount.toObject(),
            products,
        };
    }
    async remove(id) {
        await this.productService['productModel'].updateMany({ discountId: new mongoose_2.Types.ObjectId(id) }, { $unset: { discountId: '' } });
        return this.discountModel.findByIdAndDelete(id);
    }
};
exports.DiscountService = DiscountService;
exports.DiscountService = DiscountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(discount_schema_1.Discount.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        product_service_1.ProductService])
], DiscountService);
//# sourceMappingURL=discount.service.js.map