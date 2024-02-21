
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Blogs } from './blog.schema';


export enum ReactionType {
  LIKE = 'like',
  HEART = 'heart',
  HAHA = 'funny',
  SAD = 'sad',
  ANGRY = 'angry'
}

@Schema({
  timestamps: true,
})
export class Reaction {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  })
  blog: Blogs;

  @Prop({
    type: String,
    enum: Object.values(ReactionType),
    required: true,
  })
  type: ReactionType;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);