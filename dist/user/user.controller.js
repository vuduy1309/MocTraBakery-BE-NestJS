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
const register_user_dto_1 = require("./dto/register-user.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const validate_user_usecase_1 = require("../application/auth/validate-user.usecase");
const login_usecase_1 = require("../application/auth/login.usecase");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const change_password_usecase_1 = require("../application/user/change-password.usecase");
const update_profile_usecase_1 = require("../application/user/update-profile.usecase");
const get_profile_usecase_1 = require("../application/user/get-profile.usecase");
const lock_unlock_user_usecase_1 = require("../application/user/lock-unlock-user.usecase");
const list_users_usecase_1 = require("../application/user/list-users.usecase");
const register_user_usecase_1 = require("../application/user/register-user.usecase");
const common_2 = require("@nestjs/common");
let UserController = class UserController {
    validateUserUseCase;
    loginUseCase;
    changePasswordUseCase;
    updateProfileUseCase;
    getProfileUseCase;
    lockUnlockUseCase;
    listUsersUseCase;
    registerUserUseCase;
    userRepository;
    async changePassword(req, body) {
        const userId = req.user?.userId || req.user?.sub || req.user?._id;
        if (!userId)
            throw new common_1.BadRequestException('Không xác định được user');
        if (!body.oldPassword || !body.newPassword)
            throw new common_1.BadRequestException('Thiếu thông tin');
        await this.changePasswordUseCase.execute(userId, body.oldPassword, body.newPassword);
        return { message: 'Đổi mật khẩu thành công' };
    }
    constructor(validateUserUseCase, loginUseCase, changePasswordUseCase, updateProfileUseCase, getProfileUseCase, lockUnlockUseCase, listUsersUseCase, registerUserUseCase, userRepository) {
        this.validateUserUseCase = validateUserUseCase;
        this.loginUseCase = loginUseCase;
        this.changePasswordUseCase = changePasswordUseCase;
        this.updateProfileUseCase = updateProfileUseCase;
        this.getProfileUseCase = getProfileUseCase;
        this.lockUnlockUseCase = lockUnlockUseCase;
        this.listUsersUseCase = listUsersUseCase;
        this.registerUserUseCase = registerUserUseCase;
        this.userRepository = userRepository;
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
        const user = await this.updateProfileUseCase.execute(userId, update);
        return user;
    }
    async getProfile(req) {
        const userId = req.user.userId || req.user.sub || req.user._id;
        return this.getProfileUseCase.execute(userId);
    }
    async lockUser(id) {
        const user = await this.lockUnlockUseCase.lock(id);
        return user;
    }
    async unlockUser(id) {
        const user = await this.lockUnlockUseCase.unlock(id);
        return user;
    }
    async getAllUsers() {
        return this.listUsersUseCase.execute();
    }
    async register(body) {
        return this.registerUserUseCase.execute(body);
    }
    async login(loginBody) {
        let user;
        try {
            const found = await this.userRepository.findByEmail(loginBody.email);
            if (!found)
                throw new Error('Invalid credentials');
            const ok = await this.userRepository.comparePassword(loginBody.password, found.passwordHash);
            if (!ok)
                throw new Error('Invalid credentials');
            user = found;
        }
        catch (err) {
            throw new common_1.BadRequestException('Email hoặc mật khẩu không đúng');
        }
        return this.loginUseCase.execute(user);
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
    __param(8, (0, common_2.Inject)('IUserRepository')),
    __metadata("design:paramtypes", [validate_user_usecase_1.ValidateUserUseCase,
        login_usecase_1.LoginUseCase,
        change_password_usecase_1.ChangePasswordUseCase,
        update_profile_usecase_1.UpdateProfileUseCase,
        get_profile_usecase_1.GetProfileUseCase,
        lock_unlock_user_usecase_1.LockUnlockUserUseCase,
        list_users_usecase_1.ListUsersUseCase,
        register_user_usecase_1.RegisterUserUseCase, Object])
], UserController);
//# sourceMappingURL=user.controller.js.map