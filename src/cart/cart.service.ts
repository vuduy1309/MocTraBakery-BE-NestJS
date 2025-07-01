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
    const cart = await this.cartModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate({
        path: 'items.productId',
        select:
          'name images image description price sizes categoryId discountId origin isVegetarian isRefrigerated calories',
        populate: [
          { path: 'categoryId', select: 'name' },
          { path: 'discountId', select: 'name percent' },
        ],
      })
      .exec();
    if (!cart) return { items: [], total: 0 };
    // Tính tổng tiền đã trừ discount
    let total = 0;
    const items = cart.items.map((item) => {
      const prod: any =
        item.productId && typeof item.productId === 'object'
          ? item.productId
          : null;
      let discountPercent = 0;
      if (prod && prod.discountId && typeof prod.discountId === 'object' && prod.discountId.percent) {
        discountPercent = prod.discountId.percent;
      }
      const priceAfterDiscount = discountPercent ? Math.round(item.price * (1 - discountPercent / 100)) : item.price;
      total += priceAfterDiscount * item.quantity;
      return {
        productId: prod
          ? {
              _id: prod._id,
              name: prod.name,
              images: prod.images,
              image: prod.image,
              description: prod.description,
              price: prod.price,
              sizes: prod.sizes,
              origin: prod.origin,
              isVegetarian: prod.isVegetarian,
              isRefrigerated: prod.isRefrigerated,
              calories: prod.calories,
              category:
                prod.categoryId && typeof prod.categoryId === 'object'
                  ? prod.categoryId.name
                  : prod.categoryId,
              discount:
                prod.discountId && typeof prod.discountId === 'object'
                  ? {
                      name: prod.discountId.name,
                      percent: prod.discountId.percent,
                    }
                  : prod.discountId,
            }
          : null,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        priceAfterDiscount,
        discountPercent,
      };
    });
    return { items, total };
  }

  // Cập nhật số lượng sản phẩm trong cart
  async updateItemQuantity(
    userId: string,
    productId: string,
    size: string,
    quantity: number,
  ) {
    if (quantity < 1) throw new Error('Số lượng phải lớn hơn 0');
    const cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });
    if (!cart) throw new Error('Cart không tồn tại');
    // So sánh productId dưới dạng string để tránh lỗi ObjectId
    const idx = cart.items.findIndex(
      (i) => i.productId.toString() === productId && i.size === size
    );
    if (idx === -1) throw new Error('Sản phẩm không có trong giỏ hàng');
    cart.items[idx].quantity = quantity;
    return cart.save();
  }

  // Thêm sản phẩm vào cart
  async addToCart(
    userId: string,
    productId: string,
    size: string,
    quantity: number,
  ) {
    // Lấy giá sản phẩm theo size
    const product = await this.productService.findById(productId);
    if (!product) throw new Error('Sản phẩm không tồn tại');
    let price = product.price;
    if (product.sizes && product.sizes.length > 0 && size) {
      const sizeObj = product.sizes.find((s) => s.name === size);
      if (sizeObj) price = sizeObj.price;
    }
    const cart = await this.cartModel.findOne({
      userId: new Types.ObjectId(userId),
    });
    if (!cart) {
      // Tạo cart mới
      return this.cartModel.create({
        userId: new Types.ObjectId(userId),
        items: [
          { productId: new Types.ObjectId(productId), size, quantity, price },
        ],
      });
    }
    // Kiểm tra sản phẩm đã có trong cart chưa
    const idx = cart.items.findIndex(
      (i) => i.productId.equals(productId) && i.size === size,
    );
    if (idx > -1) {
      cart.items[idx].quantity += quantity;
      cart.items[idx].price = price; // cập nhật giá mới nhất
    } else {
      cart.items.push({
        productId: new Types.ObjectId(productId),
        size,
        price,
        quantity,
      });
    }
    return cart.save();
  }

  // Xóa sản phẩm khỏi cart
  async removeFromCart(userId: string, productId: string, size: string) {
    return this.cartModel.updateOne(
      { userId: new Types.ObjectId(userId) },
      { $pull: { items: { productId: new Types.ObjectId(productId), size } } },
    );
  }
}
