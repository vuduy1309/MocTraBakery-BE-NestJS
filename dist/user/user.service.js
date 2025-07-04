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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    userModel;
    async changePassword(userId, oldPassword, newPassword) {
        if (!userId)
            throw new common_1.BadRequestException('ID không hợp lệ');
        if (!mongoose_2.Types.ObjectId.isValid(userId))
            throw new common_1.BadRequestException('ID không hợp lệ');
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException('Không tìm thấy user');
        const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!isMatch)
            throw new common_1.BadRequestException('Mật khẩu cũ không đúng');
        if (oldPassword === newPassword)
            throw new common_1.BadRequestException('Mật khẩu mới phải khác mật khẩu cũ');
        user.passwordHash = await bcrypt.hash(newPassword, 10);
        await user.save();
        return true;
    }
    constructor(userModel) {
        this.userModel = userModel;
    }
    async updateProfile(userId, update) {
        if (!userId)
            throw new common_1.BadRequestException('ID không hợp lệ');
        if (!mongoose_2.Types.ObjectId.isValid(userId))
            throw new common_1.BadRequestException('ID không hợp lệ');
        const user = await this.userModel.findByIdAndUpdate(userId, { $set: update }, { new: true, select: 'email fullName phone address createdAt' }).lean();
        if (!user)
            throw new common_1.BadRequestException('Không tìm thấy user');
        return user;
    }
    async getProfile(userId) {
        if (!userId)
            throw new common_1.BadRequestException('ID không hợp lệ');
        if (!mongoose_2.Types.ObjectId.isValid(userId))
            throw new common_1.BadRequestException('ID không hợp lệ');
        const user = await this.userModel.findById(userId).select('email fullName role createdAt phone address').lean();
        if (!user)
            throw new common_1.BadRequestException('Không tìm thấy user');
        return user;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email });
    }
    async comparePassword(plain, hash) {
        return await bcrypt.compare(plain, hash);
    }
    async register(data) {
        const existed = await this.userModel.findOne({ email: data.email });
        if (existed) {
            throw new common_1.BadRequestException('Email đã tồn tại trong hệ thống');
        }
        const passwordHash = await bcrypt.hash(data.password, 10);
        const { password, role, ...rest } = data;
        const createdUser = new this.userModel({
            ...rest,
            role: role ?? 'Customer',
            passwordHash,
            createdAt: new Date(),
        });
        return createdUser.save();
    }
    async lockUser(userId) {
        return this.userModel.findByIdAndUpdate(userId, { isActive: false }, { new: true });
    }
    async unlockUser(userId) {
        return this.userModel.findByIdAndUpdate(userId, { isActive: true }, { new: true });
    }
    async login(data) {
        const user = await this.userModel.findOne({ email: data.email });
        if (!user) {
            throw new common_1.BadRequestException('Email hoặc mật khẩu không đúng');
        }
        if (user.isActive === false) {
            throw new common_1.BadRequestException('Tài khoản đã bị khoá. Vui lòng liên hệ quản trị viên.');
        }
        const isMatch = await bcrypt.compare(data.password, user.passwordHash);
        if (!isMatch) {
            throw new common_1.BadRequestException('Email hoặc mật khẩu không đúng');
        }
        const { passwordHash, ...userObj } = user.toObject();
        return userObj;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map