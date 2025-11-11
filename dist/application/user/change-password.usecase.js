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
exports.ChangePasswordUseCase = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
let ChangePasswordUseCase = class ChangePasswordUseCase {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(userId, oldPassword, newPassword) {
        if (!userId)
            throw new common_1.BadRequestException('Invalid user id');
        const user = await this.userRepo.findById(userId);
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const isMatch = await this.userRepo.comparePassword(oldPassword, user.passwordHash);
        if (!isMatch)
            throw new common_1.BadRequestException('Old password is incorrect');
        if (oldPassword === newPassword)
            throw new common_1.BadRequestException('New password must differ');
        const newHash = await bcrypt.hash(newPassword, 10);
        await this.userRepo.updateById(userId, { passwordHash: newHash });
        return true;
    }
};
exports.ChangePasswordUseCase = ChangePasswordUseCase;
exports.ChangePasswordUseCase = ChangePasswordUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object])
], ChangePasswordUseCase);
//# sourceMappingURL=change-password.usecase.js.map