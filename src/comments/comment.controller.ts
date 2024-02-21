import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard())
  @Post(':blogId/comments')
  async createComment(
    @Param('blogId') blogId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req, 
  ) {
    const { user } = req;
    const comment = await this.commentService.create(
      blogId,
      createCommentDto,
      user,
    );
    return comment;
  }

  // @Get()
  // findAll() {
  //   return this.commentService.findAll();
  // }

  @Get(':blogId/comments')
  async getCommentsByBlog(@Param('blogId') blogId: string) {
    console.log(blogId,"dfdsf")
    return this.commentService.findAllByBlog(blogId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}