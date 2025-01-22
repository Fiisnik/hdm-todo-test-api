import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/Repositories/UserRepository';
import { CreateUserDto } from './Create-user.d';
import { UpdateUserDto } from './update-user.d';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findUserById(id: number) {
    return this.userRepository.findById(id);
  }

  async findAllUsers() {
    return this.userRepository.findAll();
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    return user;
  }
}
