import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blogs, BlogsDocument } from 'src/schemas/blog.schema';
import * as path from 'path';
import * as fs from 'fs';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blogs.name) private readonly BlogModel: Model<BlogsDocument>,
  ) {}
  async create(
    createBlogDto: CreateBlogDto,
    thumbnail: Express.Multer.File,
    id: string,
  ): Promise<BlogsDocument> {
    const thumbnailUrl = await this.uploadThumbnail(thumbnail);
    const post = new this.BlogModel({
      title: createBlogDto.title,
      thumbnail: thumbnailUrl,
      category: createBlogDto.category,
      description: createBlogDto.description,
      user: id,
    });

    return post.save();
  }
  async uploadThumbnail(thumbnail: Express.Multer.File): Promise<string> {
    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const uploadPath = path.join('uploads', uniqueFilename);

    await fs.promises.writeFile(uploadPath, thumbnail.buffer);

    return uploadPath;
  }

  async findAllBlogs(): Promise<Blogs[]> {
    const blogs = await this.BlogModel.find().populate("user");
    return blogs;
  }


  async updateBlog(id: string, blog: UpdateBlogDto): Promise<{message:string}> {
    await this.BlogModel.findByIdAndUpdate(id, blog, {
     new: true,
     runValidators: true,
   });
   return {message:"Blog is Updated successfully"};
 }


 async findSingleBlog(id: string): Promise<{}> {
  const isValidId = mongoose.isValidObjectId(id);

  if (!isValidId) {
    throw new BadRequestException('Please enter correct id.');
  }

  const blog = await this.BlogModel.findById(id);

  if (!blog) {
    throw new NotFoundException('Not found.');
  }

  return blog;
}

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
