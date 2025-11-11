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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let LoginUseCase = class LoginUseCase {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async execute(user) {
        const id = user._id || user.id;
        const payload = {
            sub: id,
            email: user.email,
            role: user.role,
            fullName: user.fullName,
            isActive: user.isActive,
        };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            user: {
                _id: id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                isActive: user.isActive,
            },
        };
    }
};
exports.LoginUseCase = LoginUseCase;
exports.LoginUseCase = LoginUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], LoginUseCase);
//# sourceMappingURL=login.usecase.js.map