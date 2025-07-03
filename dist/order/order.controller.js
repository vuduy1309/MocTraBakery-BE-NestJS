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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const is_active_guard_1 = require("../auth/is-active.guard");
const vnpay_service_1 = require("./vnpay.service");
const cart_service_1 = require("../cart/cart.service");
let OrderController = class OrderController {
    orderService;
    vnpayService;
    cartService;
    constructor(orderService, vnpayService, cartService) {
        this.orderService = orderService;
        this.vnpayService = vnpayService;
        this.cartService = cartService;
    }
    async getRecentOrders(req) {
        if (req.user?.role !== 'Admin' && req.user?.role !== 'ProductManager') {
            return [];
        }
        const orders = await this.orderService.findAll({}, { sort: { createdAt: -1 }, limit: 10 });
        return orders.map((o) => ({
            code: o._id?.toString().slice(-6).toUpperCase(),
            status: o.status === 'paid' ? 'Hoàn thành' : (o.status === 'pending' ? 'Đang xử lý' : o.status),
            amount: o.total || 0,
            createdAt: o.createdAt,
        }));
    }
    async getAllOrders(req, query) {
        const filter = {};
        if (query.status)
            filter.status = query.status;
        if (query.userId)
            filter.userId = query.userId;
        const options = {
            sort: { createdAt: -1 },
            limit: query.limit ? parseInt(query.limit) : 50,
            skip: query.skip ? parseInt(query.skip) : 0,
        };
        return await this.orderService.findAll(filter, options);
    }
    async create(createOrderDto, req) {
        const order = await this.orderService.create(createOrderDto, req.user.userId);
        await this.cartService.deleteCartByUserId(req.user.userId);
        return order;
    }
    async getVnpayUrl(orderId, req) {
        const order = await this.orderService.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        const clientIp = this.getClientIp(req);
        const vnpayResponse = await this.vnpayService.createPaymentUrl(order, clientIp);
        const url = vnpayResponse?.paymentUrl || vnpayResponse?.url || vnpayResponse;
        return { url };
    }
    async vnpayReturn(query, res) {
        const isValid = this.vnpayService.verifyReturn(query);
        if (!isValid) {
            return res.redirect('/orders?error=invalid_signature');
        }
        const returnData = this.vnpayService.parseReturnData(query);
        if (returnData.isSuccess) {
            const { Types } = require('mongoose');
            let orderId = returnData.orderId;
            if (orderId && Types.ObjectId.isValid(orderId)) {
                orderId = new Types.ObjectId(orderId);
            }
            await this.orderService.markPaid(orderId);
            const order = await this.orderService.findById(orderId);
            if (order && order.userId) {
                await this.cartService.deleteCartByUserId(order.userId);
            }
            return res.redirect('/orders?paid=1&orderId=' + returnData.orderId);
        }
        else {
            return res.redirect(`/orders?paid=0&error=${returnData.responseCode}&message=${encodeURIComponent(returnData.message)}`);
        }
    }
    async updateStatus(id, status) {
        if (!['pending', 'paid', 'cancelled'].includes(status)) {
            return { error: 'Trạng thái không hợp lệ' };
        }
        return await this.orderService.updateStatus(id, status);
    }
    async getMyOrders(req) {
        const userId = req.user.userId;
        const orders = await this.orderService.findAll({ userId }, { sort: { createdAt: -1 } });
        return orders;
    }
    async getOrderDetail(id, req) {
        const order = await this.orderService.findById(id);
        if (!order)
            return { error: 'Order not found' };
        if (req.user?.role !== 'Admin' && req.user?.role !== 'ProductManager') {
            if (order.userId?.toString && order.userId.toString() !== req.user.userId) {
                return { error: 'Bạn không có quyền xem đơn này' };
            }
        }
        return order;
    }
    getClientIp(req) {
        const forwarded = req.headers['x-forwarded-for'];
        const realIp = req.headers['x-real-ip'];
        const clientIp = req.connection?.remoteAddress || req.socket?.remoteAddress;
        let ip;
        if (forwarded) {
            ip = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
        }
        else if (realIp) {
            ip = Array.isArray(realIp) ? realIp[0] : realIp;
        }
        else {
            ip = clientIp || '127.0.0.1';
        }
        if (ip.startsWith('::ffff:')) {
            ip = ip.substring(7);
        }
        return ip;
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_active_guard_1.IsActiveGuard),
    (0, common_1.Get)('recent'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getRecentOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_active_guard_1.IsActiveGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_active_guard_1.IsActiveGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_active_guard_1.IsActiveGuard),
    (0, common_1.Post)('vnpay-url'),
    __param(0, (0, common_1.Body)('orderId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getVnpayUrl", null);
__decorate([
    (0, common_1.Get)('vnpay-return'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "vnpayReturn", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_active_guard_1.IsActiveGuard),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_active_guard_1.IsActiveGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getMyOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, is_active_guard_1.IsActiveGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderDetail", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        vnpay_service_1.VnpayService,
        cart_service_1.CartService])
], OrderController);
//# sourceMappingURL=order.controller.js.map