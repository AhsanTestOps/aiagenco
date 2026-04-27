import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '@schemas/blog.schema';
import { CreateBlogDto } from '@dto/create-blog.dto';
import { UpdateBlogDto } from '@dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = new this.blogModel(createBlogDto);
    return blog.save();
  }

  async findAll(published?: boolean): Promise<Blog[]> {
    const query = published !== undefined ? { published } : {};
    return this.blogModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findBySlug(slug: string): Promise<Blog | null> {
    const blog = await this.blogModel.findOne({ slug }).exec();
    if (blog) {
      // Increment views
      await this.blogModel.updateOne({ slug }, { $inc: { views: 1 } });
    }
    return blog;
  }

  async findFeatured(): Promise<Blog[]> {
    return this.blogModel
      .find({ featured: true, published: true })
      .limit(5)
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(slug: string, updateBlogDto: UpdateBlogDto): Promise<Blog | null> {
    return this.blogModel
      .findOneAndUpdate({ slug }, updateBlogDto, { new: true })
      .exec();
  }

  async delete(slug: string): Promise<any> {
    return this.blogModel.deleteOne({ slug }).exec();
  }

  async searchByTag(tag: string): Promise<Blog[]> {
    return this.blogModel
      .find({ tags: tag, published: true })
      .sort({ createdAt: -1 })
      .exec();
  }
}
