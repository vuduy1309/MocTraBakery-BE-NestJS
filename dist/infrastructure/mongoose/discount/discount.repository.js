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
exports.MongooseDiscountRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const discount_schema_1 = require("./discount.schema");
let MongooseDiscountRepository = class MongooseDiscountRepository {
    discountModel;
    constructor(discountModel) {
        this.discountModel = discountModel;
    }
    async findAll() {
        return this.discountModel.find().exec();
    }
    async findAllActive() {
        return this.discountModel.find({ active: true }).exec();
    }
    async create(data) {
        return this.discountModel.create(data);
    }
    async update(id, data) {
        return this.discountModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async remove(id) {
        return this.discountModel.findByIdAndDelete(id).exec();
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            return null;
        return this.discountModel.findById(id).exec();
    }
};
exports.MongooseDiscountRepository = MongooseDiscountRepository;
exports.MongooseDiscountRepository = MongooseDiscountRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(discount_schema_1.Discount.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongooseDiscountRepository);
//# sourceMappingURL=discount.repository.js.map