import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { ImageModule } from './image/image.module';
import { PrismaService } from './prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostModule,
    CategoryModule,
    ImageModule,
    MulterModule.register({
      dest: './uploads', // Thư mục lưu tạm file trước khi xử lý
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
