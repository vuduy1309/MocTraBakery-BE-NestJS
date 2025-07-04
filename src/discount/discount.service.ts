import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Discount } from './discount.schema';
import { ProductService } from '../product/product.service';

@Injectable()

export class DiscountService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<Discount>,
    private productService: ProductService,
  ) {}

  async findAll(): Promise<any[]> {
    const discounts = await this.discountModel.find().exec();
    const result = await Promise.all(
      discounts.map(async (discount) => {
        // discountId là ObjectId, so sánh trực tiếp
        const products = await this.productService['productModel']
          .find({ discountId: discount._id })
          .select('_id name images')
          .exec();
        return {
          ...discount.toObject(),
          products,
        };
      })
    );
    return result;
  }

  async findAllActive(): Promise<any[]> {
    const discounts = await this.discountModel.find({ active: true }).exec();
    const result = await Promise.all(
      discounts.map(async (discount) => {
        const products = await this.productService['productModel']
          .find({ discountId: discount._id })
          .select('_id name images')
          .exec();
        return {
          ...discount.toObject(),
          products,
        };
      })
    );
    return result;
  }
  async create(createDiscountDto: any): Promise<any> {
    // Tạo discount mới
    const { productIds, ...discountData } = createDiscountDto;
    const discount = await this.discountModel.create(discountData);
    // Nếu có productIds, cập nhật discountId cho các sản phẩm tương ứng
    if (productIds && Array.isArray(productIds) && productIds.length > 0) {
      await this.productService['productModel'].updateMany(
        { _id: { $in: productIds.map((id: string) => new Types.ObjectId(id)) } },
        { $set: { discountId: discount._id } }
      );
    }
    // Trả về discount kèm danh sách sản phẩm áp dụng
    const products = productIds && productIds.length > 0
      ? await this.productService['productModel']
          .find({ _id: { $in: productIds.map((id: string) => new Types.ObjectId(id)) } })
          .select('_id name images')
          .exec()
      : [];
    return {
      ...discount.toObject(),
      products,
    };
  }

  // Sửa discount
  async update(id: string, updateDiscountDto: any): Promise<any> {
    const { productIds, ...discountData } = updateDiscountDto;
    // Cập nhật discount
    const discount = await this.discountModel.findByIdAndUpdate(id, discountData, { new: true });
    if (!discount) throw new Error('Discount not found');
    // Xóa discountId khỏi tất cả sản phẩm cũ
    await this.productService['productModel'].updateMany(
      { discountId: discount._id },
      { $unset: { discountId: '' } }
    );
    // Nếu có productIds, cập nhật discountId cho các sản phẩm mới
    if (productIds && Array.isArray(productIds) && productIds.length > 0) {
      await this.productService['productModel'].updateMany(
        { _id: { $in: productIds.map((id: string) => new Types.ObjectId(id)) } },
        { $set: { discountId: discount._id } }
      );
    }
    // Trả về discount kèm danh sách sản phẩm thực tế đang áp dụng discount này
    const products = await this.productService['productModel']
      .find({ discountId: discount._id })
      .select('_id name images categoryId')
      .exec();
    return {
      ...discount.toObject(),
      products,
    };
  }

  // Xóa discount
  async remove(id: string): Promise<any> {
    // Xóa discountId khỏi các sản phẩm đang dùng discount này
    await this.productService['productModel'].updateMany(
      { discountId: new Types.ObjectId(id) },
      { $unset: { discountId: '' } }
    );
    // Xóa discount
    return this.discountModel.findByIdAndDelete(id);
  }
}
