
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  // Lấy tất cả sản phẩm
  async findAll(): Promise<Product[]> {
    return this.productModel
      .find()
      .populate('categoryId')
      .populate('discountId')
      .exec();
  }

  // Lấy chi tiết sản phẩm theo id
  async findById(id: string): Promise<Product | null> {
    return this.productModel
      .findById(id)
      .populate('categoryId')
      .populate('discountId')
      .exec();
  }


  // Đếm tổng số sản phẩm
  async countDocuments(): Promise<number> {
    return this.productModel.countDocuments().exec();
  }

  // Lấy top N sản phẩm bán chạy (ở đây giả lập: stock thấp nhất)
  async findBestSellers(limit: number) {
    return this.productModel
      .find({ isActive: true })
      .sort({ stock: 1 })
      .limit(limit)
      .select('name stock')
      .exec();
  }

  // Thêm sản phẩm mới
  async create(data: any): Promise<Product> {
    const created = new this.productModel(data);
    return created.save();
  }
}
