"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("../infrastructure/mongoose/product/product.schema");
const order_schema_1 = require("../infrastructure/mongoose/order/order.schema");
const user_schema_1 = require("../infrastructure/mongoose/user/user.schema");
const product_repository_1 = require("../infrastructure/mongoose/product/product.repository");
const order_repository_1 = require("../infrastructure/mongoose/order/order.repository");
const user_repository_1 = require("../infrastructure/mongoose/user/user.repository");
const get_admin_stats_usecase_1 = require("../application/admin/get-admin-stats.usecase");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [
            product_repository_1.MongooseProductRepository,
            { provide: 'IProductRepository', useClass: product_repository_1.MongooseProductRepository },
            order_repository_1.MongooseOrderRepository,
            { provide: 'IOrderRepository', useClass: order_repository_1.MongooseOrderRepository },
            user_repository_1.MongooseUserRepository,
            { provide: 'IUserRepository', useClass: user_repository_1.MongooseUserRepository },
            get_admin_stats_usecase_1.GetAdminStatsUseCase,
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map