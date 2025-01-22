import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import TaskController from './Controllers/TaskController';
import { PrismaService } from './PrismaService';
import TaskRepository from './Repositories/TaskRepository';
import UseCaseFactory from './UseCase/UseCaseFactory';
import  UserRepository  from './Repositories/UserRepository';
import  UserController  from './Controllers/UserController';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TaskController, UserController],
  providers: [PrismaService, TaskRepository, UseCaseFactory, UserRepository],
})
export class AppModule {}
