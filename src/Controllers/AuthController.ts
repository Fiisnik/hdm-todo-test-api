import { Body, Controller, Post } from '@nestjs/common';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import RegisterUseCase from '../Auth/RegisterUseCase';
import LoginUseCase from '../Auth/LoginUseCase';
import UserDTO from '../Auth/UserDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Post('register')
  async register(@Body() body: UserDTO) {
    return (await this.useCaseFactory.create(RegisterUseCase)).handle(body);
  }

  @Post('login')
  async login(@Body() body: UserDTO) {
    return (await this.useCaseFactory.create(LoginUseCase)).handle(body);
  }
}
