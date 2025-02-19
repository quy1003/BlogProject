import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  // 🔹 Lấy tất cả bài viết
  async findAll() {
    return this.prisma.post.findMany({
      include: { category: true, images: true },
    });
  }

  // 🔹 Lấy 1 bài viết theo ID
  async findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: { category: true, images: true },
    });
  }

  // 🔹 Tạo bài viết mới
  async create(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({ data });
  }

  // 🔹 Cập nhật bài viết
  async update(id: number, data: Prisma.PostUpdateInput) {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  // 🔹 Xóa bài viết
  async remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
