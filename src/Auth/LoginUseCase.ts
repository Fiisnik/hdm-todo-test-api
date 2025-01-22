import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserRepository from '../Repositories/UserRepository';
import { UseCase } from '../index';
import UserDTO  from './UserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class LoginUseCase implements UseCase<Promise<{ accessToken: string }>, [dto: UserDTO]> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async handle(dto: UserDTO): Promise<{ accessToken: string }> {
    const { email, password } = dto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    const payload = { userId: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
