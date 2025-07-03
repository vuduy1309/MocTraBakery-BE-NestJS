"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_schema_1 = require("./order.schema");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const vnpay_service_1 = require("./vnpay.service");
const order_cleanup_service_1 = require("./order-cleanup.service");
const common_2 = require("@nestjs/common");
const cart_module_1 = require("../cart/cart.module");
const user_module_1 = require("../user/user.module");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema }]),
            (0, common_2.forwardRef)(() => cart_module_1.CartModule),
            (0, common_2.forwardRef)(() => user_module_1.UserModule),
        ],
        providers: [order_service_1.OrderService, vnpay_service_1.VnpayService, order_cleanup_service_1.OrderCleanupService],
        controllers: [order_controller_1.OrderController],
        exports: [order_service_1.OrderService],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map