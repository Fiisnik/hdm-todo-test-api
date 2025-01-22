import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UseCase } from '../../index';
import UserRepository from '../../Repositories/UserRepository';
import SaveUserDto from './CreateUser';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class SaveUserUseCase implements UseCase<Promise<User>, [dto: SaveUserDto]> {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(dto: SaveUserDto): Promise<User> {
    try {
      // Validation des champs obligatoires
      if (!dto.email || dto.email.trim() === '') {
        throw new BadRequestException('The "email" field is required.');
      }
      if (!dto.password || dto.password.trim() === '') {
        throw new BadRequestException('The "password" field is required.');
      }
      if (!dto.firstname || dto.firstname.trim() === '') {
        throw new BadRequestException('The "firstname" field is required.');
      }
      if (!dto.lastname || dto.lastname.trim() === '') {
        throw new BadRequestException('The "lastname" field is required.');
      }

      // Hachage du mot de passe si c'est un nouvel utilisateur
      let hashedPassword = dto.password;
      if (!dto.id) {
        hashedPassword = await bcrypt.hash(dto.password, 10);
      }

      // Sauvegarde de l'utilisateur
      const user = await this.userRepository.save({
        id: dto.id || undefined, // Création si l'id n'existe pas, sinon mise à jour
        email: dto.email,
        password: hashedPassword,
        firstname: dto.firstname,
        lastname: dto.lastname,
      });

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
