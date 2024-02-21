import {IsNotEmpty,IsString,MinLength, isNotEmpty, isString,} from "class-validator"
import { Blogs } from "src/schemas/blog.schema";
import { ReactionType } from "src/schemas/reactions.schema";
import { User } from "src/schemas/user.schema";

export class CreateReactionDto {
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
