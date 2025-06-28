
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Cho phép truy cập file tĩnh trong thư mục uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  // Bật CORS cho mọi domain, có thể cấu hình lại cho an toàn hơn
  app.enableCors({
    origin: 'http://localhost:3001', // Chỉ cho phép FE truy cập
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
