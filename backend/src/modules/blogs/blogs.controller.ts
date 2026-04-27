import { Controller, Get, Post, Body, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from '@dto/create-blog.dto';
import { UpdateBlogDto } from '@dto/update-blog.dto';
import { JwtGuard } from '@common/guards/jwt.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  async findAll(@Query('published') published?: boolean) {
    return this.blogsService.findAll(published);
  }

  @Get('featured')
  async findFeatured() {
    return this.blogsService.findFeatured();
  }

  @Get('tag/:tag')
  async findByTag(@Param('tag') tag: string) {
    return this.blogsService.searchByTag(tag);
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.blogsService.findBySlug(slug);
  }

  @Put(':slug')
  @UseGuards(JwtGuard)
  async update(@Param('slug') slug: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(slug, updateBlogDto);
  }

  @Delete(':slug')
  @UseGuards(JwtGuard)
  async delete(@Param('slug') slug: string) {
    return this.blogsService.delete(slug);
  }
}
