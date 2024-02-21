import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { Comments, CommentsSchema } from 'src/schemas/comments.schema';  // Assuming your model class is named Comments

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comments.name, schema: CommentsSchema }]),  // Using Comments.name instead of 'Comment'
    AuthModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
