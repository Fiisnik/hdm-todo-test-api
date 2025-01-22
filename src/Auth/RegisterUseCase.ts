import { Injectable, BadRequestException } from '@nestjs/common';
import { UseCase } from '../index';
import UserRepository from '../Repositories/UserRepository';
import UserDTO from './UserDTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class RegisterUseCase implements UseCase<Promise<any>, [dto: UserDTO]> {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(dto: UserDTO): Promise<any> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException('Email already exists.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userRepository.save({
      email: dto.email,
      password: hashedPassword,
      firstname: dto.firstname,
      lastname: dto.lastname,
    });

    return { message: 'User registered successfully', user: newUser };
  }
}
