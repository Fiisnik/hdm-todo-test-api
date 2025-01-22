import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from './PrismaService';
import TaskController from './Controllers/TaskController';
import UserController from './Controllers/UserController';
import { AuthController } from './Controllers/AuthController';

import TaskRepository from './Repositories/TaskRepository';
import UserRepository from './Repositories/UserRepository';

import UseCaseFactory from './UseCase/UseCaseFactory';

import LoginUseCase from './Auth/LoginUseCase';
import RegisterUseCase from './Auth/RegisterUseCase';

import { JwtStrategy } from './Auth/JwtStrategy';
import { JwtAuthGuard } from './Auth/JwtAuthGuard';

@Module({
  imports: [
    // Configuration .env
    ConfigModule.forRoot(),

    // Passport pour la gestion des stratégies d'authentification
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Module JWT pour la gestion des tokens
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  controllers: [
    TaskController, 
    UserController, 
    AuthController
  ],
  providers: [
    PrismaService,
    TaskRepository,
    UserRepository,
    UseCaseFactory,
    LoginUseCase,
    RegisterUseCase,
    JwtStrategy, // Enregistre la stratégie JWT
    JwtAuthGuard, // Enregistre le garde JWT
  ],
})
export class AppModule {}
