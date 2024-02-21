import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Comments extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Blog' })
  blogID: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
