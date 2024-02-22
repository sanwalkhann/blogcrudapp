import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from 'src/schemas/category.schema';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../src/auth/roles.guard';
import { Roles } from '../../src/auth/roles.decorator';
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles('admin') 
  create(@Body() createCategoryDto: CreateCategoryDto):Promise<{message:string}> {
    console.log("controller",createCategoryDto);
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get('all')
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles('admin',"writer","reader") 
  async findAll(): Promise<any[]> {
    return this.categoryService.findAllCatrgory();
  }



  @Put(':id')
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles('writer') 
  async updateCategory(
    @Param('id')
    id: string,
    @Body()
    category: UpdateCategoryDto,
  ): Promise<{message:string}> {
    return this.categoryService.updateCategory(id, category);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles('admin') 
  async deleteCategory(
    @Param('id')
    id: string,
  ): Promise<{message: string}> {
    return this.categoryService.deleteCategory(id);
  }

}
