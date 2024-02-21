import {IsEmail,IsNotEmpty,IsString,MinLength, minLength} from "class-validator"


export class signUpDto {
    @IsNotEmpty()
    @IsString()
    readonly username:string;
    
    @IsNotEmpty()
    @IsEmail({},{message:"Please enter valid email"})
    readonly email:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password :string;

    @IsNotEmpty()
    @IsString()
    readonly role:string;
}
