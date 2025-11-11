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
const find_all_categories_usecase_1 = require("./application/category/find-all-categories.usecase");
const find_all_active_discounts_usecase_1 = require("./application/discount/find-all-active-discounts.usecase");
const list_products_usecase_1 = require("./application/product/list-products.usecase");
const common_1 = require("@nestjs/common");
const find_all_comments_usecase_1 = require("./application/comment/find-all-comments.usecase");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    appService;
    findAllCategoriesUseCase;
    listProductsUseCase;
    findActiveDiscountsUseCase;
    findAllCommentsUseCase;
    constructor(appService, findAllCategoriesUseCase, listProductsUseCase, findActiveDiscountsUseCase, findAllCommentsUseCase) {
        this.appService = appService;
        this.findAllCategoriesUseCase = findAllCategoriesUseCase;
        this.listProductsUseCase = listProductsUseCase;
        this.findActiveDiscountsUseCase = findActiveDiscountsUseCase;
        this.findAllCommentsUseCase = findAllCommentsUseCase;
    }
    async getHomepageData() {
        const featuredProducts = await this.listProductsUseCase.execute();
        const featured = (featuredProducts || []).slice(0, 4);
        const discounts = await this.findActiveDiscountsUseCase.execute();
        const reviews = await this.findAllCommentsUseCase.execute(2);
        const promo = {
            content: 'Mua 2 bánh kem tặng 1 trà sữa! Áp dụng đến hết 30/6/2025.',
        };
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
        find_all_categories_usecase_1.FindAllCategoriesUseCase,
        list_products_usecase_1.ListProductsUseCase,
        find_all_active_discounts_usecase_1.FindAllActiveDiscountsUseCase,
        find_all_comments_usecase_1.FindAllCommentsUseCase])
], AppController);
//# sourceMappingURL=app.controller.js.map