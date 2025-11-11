"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const discount_schema_1 = require("../infrastructure/mongoose/discount/discount.schema");
const discount_controller_1 = require("./discount.controller");
const product_module_1 = require("../product/product.module");
const discount_repository_1 = require("../infrastructure/mongoose/discount/discount.repository");
const find_all_discounts_usecase_1 = require("../application/discount/find-all-discounts.usecase");
const find_all_active_discounts_usecase_1 = require("../application/discount/find-all-active-discounts.usecase");
const create_discount_usecase_1 = require("../application/discount/create-discount.usecase");
const update_discount_usecase_1 = require("../application/discount/update-discount.usecase");
const remove_discount_usecase_1 = require("../application/discount/remove-discount.usecase");
let DiscountModule = class DiscountModule {
};
exports.DiscountModule = DiscountModule;
exports.DiscountModule = DiscountModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: discount_schema_1.Discount.name, schema: discount_schema_1.DiscountSchema }]), product_module_1.ProductModule],
        controllers: [discount_controller_1.DiscountController],
        providers: [
            discount_repository_1.MongooseDiscountRepository,
            { provide: 'IDiscountRepository', useClass: discount_repository_1.MongooseDiscountRepository },
            find_all_discounts_usecase_1.FindAllDiscountsUseCase,
            find_all_active_discounts_usecase_1.FindAllActiveDiscountsUseCase,
            create_discount_usecase_1.CreateDiscountUseCase,
            update_discount_usecase_1.UpdateDiscountUseCase,
            remove_discount_usecase_1.RemoveDiscountUseCase,
        ],
        exports: [
            find_all_discounts_usecase_1.FindAllDiscountsUseCase,
            find_all_active_discounts_usecase_1.FindAllActiveDiscountsUseCase,
            create_discount_usecase_1.CreateDiscountUseCase,
            update_discount_usecase_1.UpdateDiscountUseCase,
            remove_discount_usecase_1.RemoveDiscountUseCase,
        ],
    })
], DiscountModule);
//# sourceMappingURL=discount.module.js.map