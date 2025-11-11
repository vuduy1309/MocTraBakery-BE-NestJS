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
exports.MongooseOrderRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./order.schema");
let MongooseOrderRepository = class MongooseOrderRepository {
    orderModel;
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async countDocuments(filter = {}) {
        return this.orderModel.countDocuments(filter).exec();
    }
    async find(filter, projection = {}) {
        return this.orderModel.find(filter, projection).exec();
    }
    async aggregate(pipeline) {
        return this.orderModel.aggregate(pipeline).exec();
    }
    async create(data) {
        const doc = new this.orderModel(data);
        return doc.save();
    }
    async findById(id) {
        return this.orderModel.findById(id).exec();
    }
    async findByIdAndUpdate(id, update, opts = { new: true }) {
        return this.orderModel.findByIdAndUpdate(id, update, opts).exec();
    }
    async findByIdAndDelete(id) {
        return this.orderModel.findByIdAndDelete(id).exec();
    }
    async deleteMany(filter) {
        const result = await this.orderModel.deleteMany(filter).exec();
        return { deletedCount: result?.deletedCount || 0 };
    }
};
exports.MongooseOrderRepository = MongooseOrderRepository;
exports.MongooseOrderRepository = MongooseOrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongooseOrderRepository);
//# sourceMappingURL=order.repository.js.map