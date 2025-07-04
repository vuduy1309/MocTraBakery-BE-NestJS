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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const register_user_dto_1 = require("./dto/register-user.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UserController = class UserController {
    userService;
    authService;
    async changePassword(req, body) {
        const userId = req.user?.userId || req.user?.sub || req.user?._id;
        if (!userId)
            throw new common_1.BadRequestException('Không xác định được user');
        if (!body.oldPassword || !body.newPassword)
            throw new common_1.BadRequestException('Thiếu thông tin');
        await this.userService.changePassword(userId, body.oldPassword, body.newPassword);
        return { message: 'Đổi mật khẩu thành công' };
    }
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async updateProfile(req, body) {
        const userId = req.user?.userId || req.user?.sub || req.user?._id;
        if (!userId)
            throw new common_1.BadRequestException('Không xác định được user');
        const update = {};
        if (typeof body.fullName === 'string' && body.fullName.trim() !== '')
            update.fullName = body.fullName.trim();
        if (typeof body.phone === 'string' && body.phone.trim() !== '')
            update.phone = body.phone.trim();
        if (typeof body.address === 'string' && body.address.trim() !== '')
            update.address = body.address.trim();
        if (Object.keys(update).length === 0)
            throw new common_1.BadRequestException('Không có dữ liệu cập nhật');
        const user = await this.userService.updateProfile(userId, update);
        return user;
    }
    async getProfile(req) {
        const userId = req.user.userId || req.user.sub || req.user._id;
        return this.userService.getProfile(userId);
    }
    async lockUser(id) {
        const user = await this.userService.lockUser(id);
        return user;
    }
    async unlockUser(id) {
        const user = await this.userService.unlockUser(id);
        return user;
    }
    async getAllUsers() {
        const users = await this.userService['userModel']
            .find({}, {
            email: 1,
            fullName: 1,
            role: 1,
            phone: 1,
            address: 1,
            createdAt: 1,
            isActive: 1,
        })
            .lean();
        return users;
    }
    async register(body) {
        return this.userService.register(body);
    }
    async login(loginBody) {
        let user;
        try {
            user = await this.userService.login(loginBody);
        }
        catch (err) {
            throw new common_1.BadRequestException('Email hoặc mật khẩu không đúng');
        }
        return this.authService.login(user);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/change-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)(':id/lock'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "lockUser", null);
__decorate([
    (0, common_1.Patch)(':id/unlock'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unlockUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map