import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaction, ReactionSchema } from 'src/schemas/reactions.schema';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { Blogs, BlogsSchema } from 'src/schemas/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reaction.name, schema: ReactionSchema },{name: Blogs.name, schema: BlogsSchema} ]),
  ],
  controllers: [ReactionController],
  providers: [ReactionService],
})
export class ReactionModule {}
