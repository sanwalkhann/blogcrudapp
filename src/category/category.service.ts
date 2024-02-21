import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/schemas/category.schema';
import { Model } from 'mongoose';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategoryModel:Model<Category>
  ){}
 async createCategory(createCategoryDto: CreateCategoryDto):Promise<{message:string}> {
    const {category} = createCategoryDto
    console.log("category",category);
    
    const creartedCat = await this.CategoryModel.create({
      category
    })
    return {message:"Category is created successfully"};
  }

  async findAllCatrgory(): Promise<Category[]> {
    const categories = await this.CategoryModel.find().exec();
    return categories;
  }

  async updateCategory(id: string, category: UpdateCategoryDto): Promise<{message:string}> {
     await this.CategoryModel.findByIdAndUpdate(id, category, {
      new: true,
      runValidators: true,
    });
    return {message:"Category is Updated successfully"};
  }


  async deleteCategory(id: string): Promise<{message:string}> {
         await this.CategoryModel.findByIdAndDelete(id)
         return {message:"Category is Deleted successfully"};
        }

 
}
