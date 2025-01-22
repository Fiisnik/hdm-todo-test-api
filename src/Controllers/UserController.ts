import {
    Body,
    Controller,
    Post,
  } from '@nestjs/common';
  import UseCaseFactory from '../UseCase/UseCaseFactory';
  import UserUseCase from '../UseCase/UserManagement/SaveUserUseCase';
  import SaveUserDto from '../UseCase/UserManagement/CreateUser';
  
  @Controller('/users')
  export default class UserController {
    constructor(private readonly useCaseFactory: UseCaseFactory) {}
  
    @Post('/')
    async create(@Body() dto: SaveUserDto) {
      return (await this.useCaseFactory.create(UserUseCase)).handle(dto);
    }
  
  }
  