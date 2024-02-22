/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reaction , ReactionType } from '../../src/schemas/reactions.schema';
import { CreateReactionDto } from './dto/create-reaction.dto';


@Injectable()
export class ReactionService {
  constructor(
    @InjectModel(Reaction.name) private readonly reactionModel: Model<Reaction>,
  ) {}

  async addReaction(userId: string, reactionbody: CreateReactionDto): Promise<Reaction> {
    console.log(reactionbody)
    // console.log(userId)
    const existingReaction = await this.reactionModel.findOne({user:userId  , blog: reactionbody.blog }  );

    if(!existingReaction){
      // User has not reacted before, create a new reaction
      const reaction = await this.reactionModel.create({user:userId, blog:reactionbody.blog, type:reactionbody.type} );
      return reaction;
    }
      // User has already reacted
      if (existingReaction.type) {
        // Undo the reaction if the new reaction type is the same
        await this.reactionModel.findByIdAndDelete(existingReaction._id);
        return null; // Indicate that the reaction was undone
      } else {
        // Update the reaction with the new type if it's different
        const reaction = new this.reactionModel();
        reaction.type = reactionbody.type;
        return await reaction.save();
      }
    } 
}