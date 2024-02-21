import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';
import { User } from '../schemas/user.schema';
import { signUpDto } from 'src/dto/signup.dto';
import { logInDto } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: signUpDto): Promise<{ message: string }> {
    const { username, email, password, role } = signUpDto;

    // try {
    // Check if a user with the provided username or email already exists
    const existingUserByUsername = await this.userModel.findOne({ username });
    const existingUserByEmail = await this.userModel.findOne({ email });
    if (existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    return { message: 'Signin successfully' };
    // } catch (error) {
    //   console.log(error)
    //   throw new Error(error);
    // }
  }
  async logIn(
    signInDto: logInDto,
  ): Promise<{ message: string; token: string; user: User }> {
    const { email, password } = signInDto;

    // Find the user by username
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Incorrect Email');
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect Password');
    }

    // Generate a JWT token
    const token = this.jwtService.sign({ id: user._id }, { expiresIn: '1d' });

    return { message: 'Logged in successfully', token, user };
  }
}
