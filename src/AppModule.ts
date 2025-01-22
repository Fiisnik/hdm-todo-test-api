import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import TaskController from './Controllers/TaskController';
import { PrismaService } from './PrismaService';
import TaskRepository from './Repositories/TaskRepository';
import UseCaseFactory from './UseCase/UseCaseFactory';
import  UserRepository  from './Repositories/UserRepository';
import  UserController  from './Controllers/UserController';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './Controllers/AuthController';
import LoginUseCase from './Auth/LoginUseCase';
import RegisterUseCase from './Auth/RegisterUseCase';



@Module({
  imports: [ConfigModule.forRoot(), PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '10h' }, 
    }),],
  controllers: [TaskController, UserController, AuthController],
  providers: [PrismaService, TaskRepository, UseCaseFactory, UserRepository , LoginUseCase, RegisterUseCase],
})
export class AppModule {}
