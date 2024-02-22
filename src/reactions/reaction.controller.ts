/* eslint-disable prettier/prettier */

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reaction , ReactionType } from '../../src/schemas/reactions.schema';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
@Controller('reactions')
export class ReactionController {

  constructor(private readonly reactionService: ReactionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createReaction(
    @Req() req: any,
    @Body() reactionDto: CreateReactionDto, 
  ): Promise<Reaction> {
    console.log('User:', req.user); 
    const userId = req.user.id; 
    console.log(reactionDto)
    return this.reactionService.addReaction(userId, reactionDto);
  }
}







