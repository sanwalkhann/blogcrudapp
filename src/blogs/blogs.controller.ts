import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Put,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('writer') // Specify the required roles
  @UseInterceptors(FileInterceptor('thumbnail'))
  async create(
    @Req() req,
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body() createBlogDto: CreateBlogDto,
  ) {
    console.log(req.user);
    // return
    return this.blogsService.create(createBlogDto, thumbnail, req.user._id);
  }

  @Get('all')
  // @UseGuards(AuthGuard(),RolesGuard)
  // @Roles('admin') // Specify the required roles
  async findAll(): Promise<any[]> {
    return this.blogsService.findAllBlogs();
  }

  @Put(':id')
  // @UseGuards(AuthGuard(),RolesGuard)
  // @Roles('writer') // Specify the required roles
  async updateBlog(
    @Param('id')
    id: string,
    @Body()
    blog: UpdateBlogDto,
  ): Promise<{ message: string }> {
    return this.blogsService.updateBlog(id, blog);
  }

  @Get(':id')
  // @UseGuards(AuthGuard())
  async getSingle(
    @Param('id')
    id: string,
  ): Promise<{}> {
    return this.blogsService.findSingleBlog(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
