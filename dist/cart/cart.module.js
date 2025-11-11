"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cart_schema_1 = require("../infrastructure/mongoose/cart/cart.schema");
const cart_controller_1 = require("./cart.controller");
const cart_repository_1 = require("../infrastructure/mongoose/cart/cart.repository");
const get_cart_by_user_usecase_1 = require("../application/cart/get-cart-by-user.usecase");
const add_to_cart_usecase_1 = require("../application/cart/add-to-cart.usecase");
const update_item_quantity_usecase_1 = require("../application/cart/update-item-quantity.usecase");
const remove_from_cart_usecase_1 = require("../application/cart/remove-from-cart.usecase");
const delete_cart_by_user_usecase_1 = require("../application/cart/delete-cart-by-user.usecase");
const common_2 = require("@nestjs/common");
const product_module_1 = require("../product/product.module");
const user_module_1 = require("../user/user.module");
let CartModule = class CartModule {
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: cart_schema_1.Cart.name, schema: cart_schema_1.CartSchema }]),
            (0, common_2.forwardRef)(() => product_module_1.ProductModule),
            (0, common_2.forwardRef)(() => user_module_1.UserModule),
        ],
        providers: [
            cart_repository_1.MongooseCartRepository,
            { provide: 'ICartRepository', useClass: cart_repository_1.MongooseCartRepository },
            get_cart_by_user_usecase_1.GetCartByUserUseCase,
            add_to_cart_usecase_1.AddToCartUseCase,
            update_item_quantity_usecase_1.UpdateItemQuantityUseCase,
            remove_from_cart_usecase_1.RemoveFromCartUseCase,
            delete_cart_by_user_usecase_1.DeleteCartByUserUseCase,
        ],
        controllers: [cart_controller_1.CartController],
        exports: [
            { provide: 'ICartRepository', useClass: cart_repository_1.MongooseCartRepository },
            get_cart_by_user_usecase_1.GetCartByUserUseCase,
            add_to_cart_usecase_1.AddToCartUseCase,
            update_item_quantity_usecase_1.UpdateItemQuantityUseCase,
            remove_from_cart_usecase_1.RemoveFromCartUseCase,
            delete_cart_by_user_usecase_1.DeleteCartByUserUseCase,
        ],
    })
], CartModule);
//# sourceMappingURL=cart.module.js.map