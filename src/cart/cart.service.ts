import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './cart.schema';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private readonly productService: ProductService,
  ) {}

  // Lấy cart theo userId
  async getCartByUser(userId: string) {
    const cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) }).populate('items.productId').exec();
    if (!cart) return { items: [], total: 0 };
    const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Trả về cả items và total
    return { ...cart.toObject(), total };
  }

  // Thêm sản phẩm vào cart
  async addToCart(userId: string, productId: string, size: string, quantity: number) {
    // Lấy giá sản phẩm theo size
    const product = await this.productService.findById(productId);
    if (!product) throw new Error('Sản phẩm không tồn tại');
    let price = product.price;
    if (product.sizes && product.sizes.length > 0 && size) {
      const sizeObj = product.sizes.find(s => s.name === size);
      if (sizeObj) price = sizeObj.price;
    }
    const cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });
    if (!cart) {
      // Tạo cart mới
      return this.cartModel.create({
        userId: new Types.ObjectId(userId),
        items: [{ productId: new Types.ObjectId(productId), size, quantity, price }],
      });
    }
    // Kiểm tra sản phẩm đã có trong cart chưa
    const idx = cart.items.findIndex(i => i.productId.equals(productId) && i.size === size);
    if (idx > -1) {
      cart.items[idx].quantity += quantity;
      cart.items[idx].price = price; // cập nhật giá mới nhất
    } else {
      cart.items.push({ productId: new Types.ObjectId(productId), size, price, quantity });
    }
    return cart.save();
  }

  // Xóa sản phẩm khỏi cart
  async removeFromCart(userId: string, productId: string, size: string) {
    return this.cartModel.updateOne(
      { userId: new Types.ObjectId(userId) },
      { $pull: { items: { productId: new Types.ObjectId(productId), size } } }
    );
  }
}
