import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { DiscountModule } from './discount/discount.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { UploadModule } from './upload/upload.module';
import { OrderModule } from './order/order.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://duyha8618:duyha123@cluster0.5lrw6lt.mongodb.net/MocTraBakery?retryWrites=true&w=majority',
    ),
    UserModule,
    ProductModule,
    CategoryModule,
    DiscountModule,
    CartModule,
    AuthModule,
    CommentModule,
    UploadModule,
    OrderModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
