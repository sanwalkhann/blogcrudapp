import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BlogsModules } from './blogs/blogs.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comments/comment.module';
import { ReactionModule } from './reactions/reaction.module';
import { MulterModule } from '@nestjs/platform-express/multer';



AuthModule;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MulterModule.register({
      dest: '/uploads'
    }),
    AuthModule,
    BlogsModules,
    CategoryModule,
    CommentModule,
    ReactionModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
