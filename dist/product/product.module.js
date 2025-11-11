"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("../infrastructure/mongoose/product/product.schema");
const product_controller_1 = require("./product.controller");
const common_2 = require("@nestjs/common");
const order_module_1 = require("../order/order.module");
const user_module_1 = require("../user/user.module");
const product_repository_1 = require("../infrastructure/mongoose/product/product.repository");
const create_product_usecase_1 = require("../application/product/create-product.usecase");
const get_product_usecase_1 = require("../application/product/get-product.usecase");
const list_products_usecase_1 = require("../application/product/list-products.usecase");
const update_product_usecase_1 = require("../application/product/update-product.usecase");
const count_products_usecase_1 = require("../application/product/count-products.usecase");
const find_bestsellers_usecase_1 = require("../application/product/find-bestsellers.usecase");
const remove_product_usecase_1 = require("../application/product/remove-product.usecase");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }]),
            (0, common_2.forwardRef)(() => order_module_1.OrderModule),
            user_module_1.UserModule,
        ],
        providers: [
            product_repository_1.MongooseProductRepository,
            { provide: 'IProductRepository', useClass: product_repository_1.MongooseProductRepository },
            create_product_usecase_1.CreateProductUseCase,
            get_product_usecase_1.GetProductUseCase,
            list_products_usecase_1.ListProductsUseCase,
            update_product_usecase_1.UpdateProductUseCase,
            remove_product_usecase_1.RemoveProductUseCase,
            count_products_usecase_1.CountProductsUseCase,
            find_bestsellers_usecase_1.FindBestSellersUseCase,
        ],
        controllers: [product_controller_1.ProductController],
        exports: [
            product_repository_1.MongooseProductRepository,
            { provide: 'IProductRepository', useClass: product_repository_1.MongooseProductRepository },
            create_product_usecase_1.CreateProductUseCase,
            get_product_usecase_1.GetProductUseCase,
            list_products_usecase_1.ListProductsUseCase,
            update_product_usecase_1.UpdateProductUseCase,
            remove_product_usecase_1.RemoveProductUseCase,
            count_products_usecase_1.CountProductsUseCase,
            find_bestsellers_usecase_1.FindBestSellersUseCase,
        ],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map