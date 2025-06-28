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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/MocTraBakery'),
    UserModule,
    ProductModule, 
    CategoryModule,
    DiscountModule,
    CartModule,
    AuthModule,
    CommentModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
