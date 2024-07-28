import {
  Controller,
  Get,
  Post,
  Render,
  UseGuards,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ResponseMessage('User login success')
  handleLogin(
    @Req() req,
    // gán cookie
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(req.user, response);
  }

  @Public() // dùng public để k cần dùng jwt
  @ResponseMessage('Register a new user')
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @ResponseMessage('Get user information')
  @Get('/account')
  handleGetAccount(@User() user: IUser) {
    // req.user
    return { user };
  }
  // @Public() // TEst
  // @ResponseMessage('register a new user test')
  // @Post('/register-test')
  // handleRegisterTest(@Body() registerUserDtoTest: RegisterUserDto) {
  //   return this.authService.register(registerUserDtoTest);
  // }
}
