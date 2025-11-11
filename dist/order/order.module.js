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
const order_schema_1 = require("../infrastructure/mongoose/order/order.schema");
const order_controller_1 = require("./order.controller");
const vnpay_adapter_1 = require("../infrastructure/vnpay/vnpay.adapter");
const order_cleanup_service_1 = require("./order-cleanup.service");
const common_2 = require("@nestjs/common");
const cart_module_1 = require("../cart/cart.module");
const user_module_1 = require("../user/user.module");
const product_module_1 = require("../product/product.module");
const order_repository_1 = require("../infrastructure/mongoose/order/order.repository");
const create_order_usecase_1 = require("../application/order/create-order.usecase");
const find_order_usecase_1 = require("../application/order/find-order.usecase");
const list_orders_usecase_1 = require("../application/order/list-orders.usecase");
const mark_paid_usecase_1 = require("../application/order/mark-paid.usecase");
const update_order_status_usecase_1 = require("../application/order/update-order-status.usecase");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema }]),
            (0, common_2.forwardRef)(() => cart_module_1.CartModule),
            (0, common_2.forwardRef)(() => user_module_1.UserModule),
            (0, common_2.forwardRef)(() => product_module_1.ProductModule),
        ],
        providers: [
            order_repository_1.MongooseOrderRepository,
            { provide: 'IOrderRepository', useClass: order_repository_1.MongooseOrderRepository },
            create_order_usecase_1.CreateOrderUseCase,
            find_order_usecase_1.FindOrderUseCase,
            list_orders_usecase_1.ListOrdersUseCase,
            mark_paid_usecase_1.MarkPaidUseCase,
            update_order_status_usecase_1.UpdateOrderStatusUseCase,
            vnpay_adapter_1.VnpayAdapter,
            { provide: 'IVnpayProvider', useClass: vnpay_adapter_1.VnpayAdapter },
            order_cleanup_service_1.OrderCleanupService,
        ],
        controllers: [order_controller_1.OrderController],
        exports: [
            { provide: 'IOrderRepository', useClass: order_repository_1.MongooseOrderRepository },
            create_order_usecase_1.CreateOrderUseCase,
            find_order_usecase_1.FindOrderUseCase,
            list_orders_usecase_1.ListOrdersUseCase,
            mark_paid_usecase_1.MarkPaidUseCase,
            update_order_status_usecase_1.UpdateOrderStatusUseCase,
        ],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map