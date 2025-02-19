import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Prisma.PostCreateInput) {
    return this.postService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.PostUpdateInput) {
    return this.postService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(Number(id));
  }
}
