import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { signUpDto } from 'src/dto/signup.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { logInDto } from 'src/dto/login.dto';
import { User } from 'src/schemas/user.schema';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: signUpDto): Promise<{ message: string }> {
    return this.authService.signUp(signUpDto);
  }
  @Post('login')
  login(
    @Body() logInDto: logInDto,
  ): Promise<{ message: string; token: string; user: User }> {
    return this.authService.logIn(logInDto);
  }
}
