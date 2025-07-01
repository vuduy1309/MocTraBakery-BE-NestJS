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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_schema_1 = require("./cart.schema");
const product_service_1 = require("../product/product.service");
let CartService = class CartService {
    cartModel;
    productService;
    constructor(cartModel, productService) {
        this.cartModel = cartModel;
        this.productService = productService;
    }
    async getCartByUser(userId) {
        const cart = await this.cartModel
            .findOne({ userId: new mongoose_2.Types.ObjectId(userId) })
            .populate({
            path: 'items.productId',
            select: 'name images image description price sizes categoryId discountId origin isVegetarian isRefrigerated calories',
            populate: [
                { path: 'categoryId', select: 'name' },
                { path: 'discountId', select: 'name percent' },
            ],
        })
            .exec();
        if (!cart)
            return { items: [], total: 0 };
        const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const items = cart.items.map((item) => {
            const prod = item.productId && typeof item.productId === 'object'
                ? item.productId
                : null;
            return {
                productId: prod
                    ? {
                        _id: prod._id,
                        name: prod.name,
                        images: prod.images,
                        image: prod.image,
                        description: prod.description,
                        price: prod.price,
                        sizes: prod.sizes,
                        origin: prod.origin,
                        isVegetarian: prod.isVegetarian,
                        isRefrigerated: prod.isRefrigerated,
                        calories: prod.calories,
                        category: prod.categoryId && typeof prod.categoryId === 'object'
                            ? prod.categoryId.name
                            : prod.categoryId,
                        discount: prod.discountId && typeof prod.discountId === 'object'
                            ? {
                                name: prod.discountId.name,
                                percent: prod.discountId.percent,
                            }
                            : prod.discountId,
                    }
                    : null,
                size: item.size,
                quantity: item.quantity,
                price: item.price,
            };
        });
        return { items, total };
    }
    async updateItemQuantity(userId, productId, size, quantity) {
        if (quantity < 1)
            throw new Error('Số lượng phải lớn hơn 0');
        const cart = await this.cartModel.findOne({ userId: new mongoose_2.Types.ObjectId(userId) });
        if (!cart)
            throw new Error('Cart không tồn tại');
        const idx = cart.items.findIndex((i) => i.productId.toString() === productId && i.size === size);
        if (idx === -1)
            throw new Error('Sản phẩm không có trong giỏ hàng');
        cart.items[idx].quantity = quantity;
        return cart.save();
    }
    async addToCart(userId, productId, size, quantity) {
        const product = await this.productService.findById(productId);
        if (!product)
            throw new Error('Sản phẩm không tồn tại');
        let price = product.price;
        if (product.sizes && product.sizes.length > 0 && size) {
            const sizeObj = product.sizes.find((s) => s.name === size);
            if (sizeObj)
                price = sizeObj.price;
        }
        const cart = await this.cartModel.findOne({
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        if (!cart) {
            return this.cartModel.create({
                userId: new mongoose_2.Types.ObjectId(userId),
                items: [
                    { productId: new mongoose_2.Types.ObjectId(productId), size, quantity, price },
                ],
            });
        }
        const idx = cart.items.findIndex((i) => i.productId.equals(productId) && i.size === size);
        if (idx > -1) {
            cart.items[idx].quantity += quantity;
            cart.items[idx].price = price;
        }
        else {
            cart.items.push({
                productId: new mongoose_2.Types.ObjectId(productId),
                size,
                price,
                quantity,
            });
        }
        return cart.save();
    }
    async removeFromCart(userId, productId, size) {
        return this.cartModel.updateOne({ userId: new mongoose_2.Types.ObjectId(userId) }, { $pull: { items: { productId: new mongoose_2.Types.ObjectId(productId), size } } });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        product_service_1.ProductService])
], CartService);
//# sourceMappingURL=cart.service.js.map