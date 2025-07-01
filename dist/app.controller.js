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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const product_service_1 = require("./product/product.service");
const category_service_1 = require("./category/category.service");
const discount_service_1 = require("./discount/discount.service");
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment/comment.service");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    appService;
    productService;
    categoryService;
    discountService;
    commentService;
    constructor(appService, productService, categoryService, discountService, commentService) {
        this.appService = appService;
        this.productService = productService;
        this.categoryService = categoryService;
        this.discountService = discountService;
        this.commentService = commentService;
    }
    async getHomepageData() {
        const featuredProducts = await this.productService.findAll();
        const featured = featuredProducts.slice(0, 3);
        const discounts = await this.discountService.findAllActive();
        const reviews = await this.commentService.findAll(2);
        const promo = { content: 'Mua 2 bánh kem tặng 1 trà sữa! Áp dụng đến hết 30/6/2025.' };
        return {
            featuredProducts: featured,
            discounts,
            reviews,
            promo,
        };
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('homepage-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHomepageData", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        product_service_1.ProductService,
        category_service_1.CategoryService,
        discount_service_1.DiscountService,
        comment_service_1.CommentService])
], AppController);
//# sourceMappingURL=app.controller.js.map