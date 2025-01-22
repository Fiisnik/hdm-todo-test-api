import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UserUseCase } from '../UseCase/UserManagement/UserUseCase';
import { CreateUserDto } from '../UseCase/UserManagement/Create-User';
import { UpdateUserDto } from '../UseCase/UserManagement/update-user';

@Controller('users')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userUseCase.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userUseCase.findAllUsers();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.userUseCase.findUserById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userUseCase.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userUseCase.deleteUser(id);
  }
}
