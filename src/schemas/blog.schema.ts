import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Mongoose } from 'mongoose';
import mongoose from 'mongoose';
export type BlogsDocument = HydratedDocument<Blogs>;
@Schema({
  timestamps: true,
})
export class Blogs extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  thumbnail: string;
  @Prop({ required: true })
  category: string;
  @Prop({ required: true })
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: string;
}
export const BlogsSchema = SchemaFactory.createForClass(Blogs);
