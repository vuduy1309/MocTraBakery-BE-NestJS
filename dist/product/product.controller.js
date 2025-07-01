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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    async update(id, body) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid product id');
        }
        if (!body.name || !body.price || !body.stock || !body.categoryId) {
            throw new common_1.BadRequestException('Thiếu trường bắt buộc');
        }
        if (typeof body.images === 'string') {
            body.images = body.images.split(',').map((s) => s.trim());
        }
        if (typeof this.productService['update'] !== 'function') {
            throw new common_1.NotFoundException('Update method not implemented in ProductService');
        }
        const updated = await this.productService.update(id, body);
        if (!updated) {
            throw new common_1.NotFoundException('Product not found');
        }
        return updated;
    }
    async remove(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid product id');
        }
        if (typeof this.productService['remove'] !== 'function') {
            throw new common_1.NotFoundException('Remove method not implemented in ProductService');
        }
        const deleted = await this.productService.remove(id);
        if (!deleted) {
            throw new common_1.NotFoundException('Product not found');
        }
        return { success: true };
    }
    async create(body) {
        if (!body.name || !body.price || !body.stock || !body.categoryId) {
            throw new common_1.BadRequestException('Thiếu trường bắt buộc');
        }
        if (typeof body.images === 'string') {
            body.images = body.images.split(',').map((s) => s.trim());
        }
        const created = await this.productService.create(body);
        return created;
    }
    async getDashboardStats() {
        const totalProducts = await this.productService.countDocuments();
        const totalOrders = 0;
        const totalCustomers = 0;
        const totalRevenue = 0;
        const bestSellers = await this.productService.findBestSellers(3);
        const recentOrders = [];
        return {
            totalProducts,
            totalOrders,
            totalCustomers,
            totalRevenue,
            bestSellers,
            recentOrders,
        };
    }
    async getAll() {
        const products = await this.productService.findAll();
        return products.map((p) => {
            const obj = p.toObject ? p.toObject() : p;
            return {
                _id: obj._id,
                name: obj.name,
                description: obj.description,
                price: obj.price,
                images: obj.images,
                stock: obj.stock,
                isActive: obj.isActive,
                categoryId: obj.categoryId,
                discountId: obj.discountId,
                createdBy: obj.createdBy,
                createdAt: obj.createdAt,
                shelfLifeDays: obj.shelfLifeDays,
                isRefrigerated: obj.isRefrigerated,
                isVegetarian: obj.isVegetarian,
                calories: obj.calories,
                includedFlavors: obj.includedFlavors,
                packaging: obj.packaging,
                sizes: obj.sizes,
                origin: obj.origin,
            };
        });
    }
    async getById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid product id');
        }
        const p = await this.productService.findById(id);
        if (!p) {
            throw new common_1.NotFoundException('Product not found');
        }
        const obj = p.toObject ? p.toObject() : p;
        return {
            _id: obj._id,
            name: obj.name,
            description: obj.description,
            price: obj.price,
            images: obj.images,
            stock: obj.stock,
            isActive: obj.isActive,
            categoryId: obj.categoryId,
            discountId: obj.discountId,
            createdBy: obj.createdBy,
            createdAt: obj.createdAt,
            shelfLifeDays: obj.shelfLifeDays,
            isRefrigerated: obj.isRefrigerated,
            isVegetarian: obj.isVegetarian,
            calories: obj.calories,
            includedFlavors: obj.includedFlavors,
            packaging: obj.packaging,
            sizes: obj.sizes,
            origin: obj.origin,
        };
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/dashboard-stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getById", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map