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
const create_product_usecase_1 = require("../application/product/create-product.usecase");
const get_product_usecase_1 = require("../application/product/get-product.usecase");
const list_products_usecase_1 = require("../application/product/list-products.usecase");
const update_product_usecase_1 = require("../application/product/update-product.usecase");
const remove_product_usecase_1 = require("../application/product/remove-product.usecase");
const count_products_usecase_1 = require("../application/product/count-products.usecase");
const find_bestsellers_usecase_1 = require("../application/product/find-bestsellers.usecase");
let ProductController = class ProductController {
    orderRepository;
    userRepository;
    createProductUseCase;
    getProductUseCase;
    listProductsUseCase;
    updateProductUseCase;
    removeProductUseCase;
    countProductsUseCase;
    findBestSellersUseCase;
    constructor(orderRepository, userRepository, createProductUseCase, getProductUseCase, listProductsUseCase, updateProductUseCase, removeProductUseCase, countProductsUseCase, findBestSellersUseCase) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.createProductUseCase = createProductUseCase;
        this.getProductUseCase = getProductUseCase;
        this.listProductsUseCase = listProductsUseCase;
        this.updateProductUseCase = updateProductUseCase;
        this.removeProductUseCase = removeProductUseCase;
        this.countProductsUseCase = countProductsUseCase;
        this.findBestSellersUseCase = findBestSellersUseCase;
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
        let updateBody = { ...body };
        if (body.$unset) {
            updateBody = { ...body };
        }
        const updated = await this.updateProductUseCase.execute(id, updateBody);
        if (!updated) {
            throw new common_1.NotFoundException('Product not found');
        }
        return updated;
    }
    async remove(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid product id');
        }
        const deleted = await this.removeProductUseCase.execute(id);
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
        const created = await this.createProductUseCase.execute(body);
        return created;
    }
    async getDashboardStats() {
        const totalProducts = await this.countProductsUseCase.execute();
        const totalOrders = await this.orderRepository.countDocuments();
        const totalCustomers = await this.userRepository.countDocuments({
            role: 'Customer',
        });
        const orders = await this.orderRepository.find({}, { total: 1 });
        const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        const bestSellers = await this.findBestSellersUseCase.execute(5);
        return {
            totalProducts,
            totalOrders,
            totalCustomers,
            totalRevenue,
            bestSellers,
        };
    }
    async getAll() {
        const products = await this.listProductsUseCase.execute();
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
        const p = await this.getProductUseCase.execute(id);
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
    __param(0, (0, common_1.Inject)('IOrderRepository')),
    __param(1, (0, common_1.Inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object, Object, create_product_usecase_1.CreateProductUseCase,
        get_product_usecase_1.GetProductUseCase,
        list_products_usecase_1.ListProductsUseCase,
        update_product_usecase_1.UpdateProductUseCase,
        remove_product_usecase_1.RemoveProductUseCase,
        count_products_usecase_1.CountProductsUseCase,
        find_bestsellers_usecase_1.FindBestSellersUseCase])
], ProductController);
//# sourceMappingURL=product.controller.js.map