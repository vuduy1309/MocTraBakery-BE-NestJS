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
exports.MongooseProductRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./product.schema");
let MongooseProductRepository = class MongooseProductRepository {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(data) {
        const created = new this.productModel(data);
        return created.save();
    }
    async update(id, data) {
        if (data.$unset) {
            const unset = data.$unset;
            const setData = { ...data };
            delete setData.$unset;
            await this.productModel.updateOne({ _id: id }, { $set: setData, $unset: unset });
            return this.productModel
                .findById(id)
                .populate('categoryId')
                .populate('discountId')
                .exec();
        }
        else {
            return this.productModel
                .findByIdAndUpdate(id, data, { new: true })
                .populate('categoryId')
                .populate('discountId')
                .exec();
        }
    }
    async remove(id) {
        return this.productModel.findByIdAndDelete(id).exec();
    }
    async findAll() {
        return this.productModel
            .find()
            .populate('categoryId')
            .populate('discountId')
            .exec();
    }
    async find(filter, projection = {}) {
        return this.productModel
            .find(filter, projection)
            .populate('categoryId')
            .populate('discountId')
            .exec();
    }
    async findById(id) {
        return this.productModel
            .findById(id)
            .populate('categoryId')
            .populate('discountId')
            .exec();
    }
    async countDocuments() {
        return this.productModel.countDocuments().exec();
    }
    async findBestSellers(limit) {
        return this.productModel
            .find({ isActive: true })
            .sort({ stock: 1 })
            .limit(limit)
            .select('name stock')
            .exec();
    }
    async updateMany(ids, update) {
        const objectIds = ids.map((id) => new mongoose_2.Types.ObjectId(id));
        return this.productModel
            .updateMany({ _id: { $in: objectIds } }, update)
            .exec();
    }
    async updateManyByFilter(filter, update) {
        return this.productModel.updateMany(filter, update).exec();
    }
};
exports.MongooseProductRepository = MongooseProductRepository;
exports.MongooseProductRepository = MongooseProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongooseProductRepository);
//# sourceMappingURL=product.repository.js.map