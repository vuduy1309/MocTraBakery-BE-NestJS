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
exports.DiscountController = void 0;
const common_1 = require("@nestjs/common");
const create_discount_dto_1 = require("./dto/create-discount.dto");
const find_all_discounts_usecase_1 = require("../application/discount/find-all-discounts.usecase");
const create_discount_usecase_1 = require("../application/discount/create-discount.usecase");
const update_discount_usecase_1 = require("../application/discount/update-discount.usecase");
const remove_discount_usecase_1 = require("../application/discount/remove-discount.usecase");
let DiscountController = class DiscountController {
    findAllUseCase;
    createUseCase;
    updateUseCase;
    removeUseCase;
    constructor(findAllUseCase, createUseCase, updateUseCase, removeUseCase) {
        this.findAllUseCase = findAllUseCase;
        this.createUseCase = createUseCase;
        this.updateUseCase = updateUseCase;
        this.removeUseCase = removeUseCase;
    }
    async findAll() {
        return this.findAllUseCase.execute();
    }
    async findAllActive() {
        return (await this.findAllUseCase.execute()).filter((d) => d.active);
    }
    async create(createDiscountDto) {
        return this.createUseCase.execute(createDiscountDto);
    }
    async update(id, updateDiscountDto) {
        return this.updateUseCase.execute(id, updateDiscountDto);
    }
    async remove(id) {
        return this.removeUseCase.execute(id);
    }
};
exports.DiscountController = DiscountController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "findAllActive", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_discount_dto_1.CreateDiscountDto]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscountController.prototype, "remove", null);
exports.DiscountController = DiscountController = __decorate([
    (0, common_1.Controller)('discounts'),
    __metadata("design:paramtypes", [find_all_discounts_usecase_1.FindAllDiscountsUseCase,
        create_discount_usecase_1.CreateDiscountUseCase,
        update_discount_usecase_1.UpdateDiscountUseCase,
        remove_discount_usecase_1.RemoveDiscountUseCase])
], DiscountController);
//# sourceMappingURL=discount.controller.js.map