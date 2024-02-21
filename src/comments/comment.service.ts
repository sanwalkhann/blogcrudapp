import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from 'src/schemas/comments.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comments.name) private readonly CommentModel: Model<Document>) {}

  async create(blogId: string, createCommentDto: CreateCommentDto, user: any): Promise<Document> {
    const comment = new this.CommentModel({
      ...createCommentDto,
      blogID: blogId,
      userID: user._id, // Assuming your user model has an '_id' field
    });
    return comment.save();
  }

  // findAll() {
  //   return `This action returns all comment`;
  // }

  async findAllByBlog(blogId: string) {
    console.log("object",blogId)
    return this.CommentModel.find({ blogID: blogId }).populate("userID").exec();

  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}