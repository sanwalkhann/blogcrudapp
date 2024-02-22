import { PartialType } from '@nestjs/mapped-types';
import { CreateReactionDto } from './create-reaction.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ReactionType } from '../../../src/schemas/reactions.schema';
import { Blogs } from '../../../src/schemas/blog.schema';
import { User } from '../../../src/schemas/user.schema';

export class UpdateReactionDto {
    @IsNotEmpty()
    @IsString()
    readonly type :ReactionType;


    @IsNotEmpty()
    @IsString()
    readonly blog : Blogs;

    @IsNotEmpty()
    @IsString()
    readonly user : User;
}
