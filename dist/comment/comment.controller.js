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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const find_all_comments_usecase_1 = require("../application/comment/find-all-comments.usecase");
const find_by_product_usecase_1 = require("../application/comment/find-by-product.usecase");
const create_comment_usecase_1 = require("../application/comment/create-comment.usecase");
let CommentController = class CommentController {
    findAllCommentsUseCase;
    findByProductUseCase;
    createCommentUseCase;
    constructor(findAllCommentsUseCase, findByProductUseCase, createCommentUseCase) {
        this.findAllCommentsUseCase = findAllCommentsUseCase;
        this.findByProductUseCase = findByProductUseCase;
        this.createCommentUseCase = createCommentUseCase;
    }
    async getAll(req) {
        const productId = req.query?.productId;
        if (productId) {
            return this.findByProductUseCase.execute(productId);
        }
        const limit = req.query?.limit ? parseInt(req.query.limit) : undefined;
        return this.findAllCommentsUseCase.execute(limit);
    }
    async createComment(req, body) {
        const userId = req.user?.userId || req.user?.sub || req.user?._id;
        if (!userId)
            throw new common_1.BadRequestException('Không xác định user');
        return this.createCommentUseCase.execute(userId, body);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createComment", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [find_all_comments_usecase_1.FindAllCommentsUseCase,
        find_by_product_usecase_1.FindByProductUseCase,
        create_comment_usecase_1.CreateCommentUseCase])
], CommentController);
//# sourceMappingURL=comment.controller.js.map