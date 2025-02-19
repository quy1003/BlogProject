import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({ include: { posts: true } });
  }

  async create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  async remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
