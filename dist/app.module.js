"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const product_module_1 = require("./product/product.module");
const category_module_1 = require("./category/category.module");
const discount_module_1 = require("./discount/discount.module");
const cart_module_1 = require("./cart/cart.module");
const auth_module_1 = require("./auth/auth.module");
const comment_module_1 = require("./comment/comment.module");
const upload_module_1 = require("./upload/upload.module");
const order_module_1 = require("./order/order.module");
const admin_module_1 = require("./admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://duyha8618:duyha123@cluster0.5lrw6lt.mongodb.net/MocTraBakery?retryWrites=true&w=majority'),
            user_module_1.UserModule,
            product_module_1.ProductModule,
            category_module_1.CategoryModule,
            discount_module_1.DiscountModule,
            cart_module_1.CartModule,
            auth_module_1.AuthModule,
            comment_module_1.CommentModule,
            upload_module_1.UploadModule,
            order_module_1.OrderModule,
            admin_module_1.AdminModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map