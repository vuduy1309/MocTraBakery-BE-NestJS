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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const is_active_guard_1 = require("../auth/is-active.guard");
const get_cart_by_user_usecase_1 = require("../application/cart/get-cart-by-user.usecase");
const add_to_cart_usecase_1 = require("../application/cart/add-to-cart.usecase");
const update_item_quantity_usecase_1 = require("../application/cart/update-item-quantity.usecase");
const remove_from_cart_usecase_1 = require("../application/cart/remove-from-cart.usecase");
let CartController = class CartController {
    getCartByUserUseCase;
    addToCartUseCase;
    updateItemQuantityUseCase;
    removeFromCartUseCase;
    constructor(getCartByUserUseCase, addToCartUseCase, updateItemQuantityUseCase, removeFromCartUseCase) {
        this.getCartByUserUseCase = getCartByUserUseCase;
        this.addToCartUseCase = addToCartUseCase;
        this.updateItemQuantityUseCase = updateItemQuantityUseCase;
        this.removeFromCartUseCase = removeFromCartUseCase;
    }
    async getCart(req) {
        console.log('[CartController.getCart] request.user:', req.user);
        const userId = req.user.userId;
        return this.getCartByUserUseCase.execute(userId);
    }
    async addToCart(req, body) {
        console.log('[CartController.addToCart] request.user:', req.user);
        const userId = req.user.userId;
        const { productId, size, quantity } = body;
        return this.addToCartUseCase.execute(userId, productId, size, quantity);
    }
    async updateItemQuantity(req, body) {
        console.log('[CartController.updateItemQuantity] request.user:', req.user);
        const userId = req.user.userId;
        const { productId, size, quantity } = body;
        return this.updateItemQuantityUseCase.execute(userId, productId, size, quantity);
    }
    async removeFromCart(req, body) {
        console.log('[CartController.removeFromCart] request.user:', req.user);
        const userId = req.user.userId;
        const { productId, size } = body;
        return this.removeFromCartUseCase.execute(userId, productId, size);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_active_guard_1.IsActiveGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_active_guard_1.IsActiveGuard),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_active_guard_1.IsActiveGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateItemQuantity", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_active_guard_1.IsActiveGuard),
    (0, common_1.Post)('remove'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeFromCart", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [get_cart_by_user_usecase_1.GetCartByUserUseCase,
        add_to_cart_usecase_1.AddToCartUseCase,
        update_item_quantity_usecase_1.UpdateItemQuantityUseCase,
        remove_from_cart_usecase_1.RemoveFromCartUseCase])
], CartController);
//# sourceMappingURL=cart.controller.js.map