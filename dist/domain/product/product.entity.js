"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
class ProductEntity {
    id;
    name;
    description;
    price;
    images;
    stock;
    isActive;
    categoryId;
    discountId;
    createdBy;
    createdAt;
    shelfLifeDays;
    isRefrigerated;
    isVegetarian;
    calories;
    includedFlavors;
    packaging;
    sizes;
    origin;
    constructor(id, name, description, price, images, stock, isActive, categoryId, discountId, createdBy, createdAt, shelfLifeDays, isRefrigerated, isVegetarian, calories, includedFlavors, packaging, sizes, origin) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.images = images;
        this.stock = stock;
        this.isActive = isActive;
        this.categoryId = categoryId;
        this.discountId = discountId;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.shelfLifeDays = shelfLifeDays;
        this.isRefrigerated = isRefrigerated;
        this.isVegetarian = isVegetarian;
        this.calories = calories;
        this.includedFlavors = includedFlavors;
        this.packaging = packaging;
        this.sizes = sizes;
        this.origin = origin;
    }
}
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map