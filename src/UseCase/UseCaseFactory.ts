import { Injectable } from '@nestjs/common';
import ServiceFactory from '../ServiceFactory';
import DeleteTask from './DeleteTask/DeleteTask';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';
import SaveTaskUseCase from './SaveTask/SaveTaskUseCase';
import EditTaskUseCase from './EditTask/EditTaskUseCase';
import  UserUseCase  from './UserManagement/SaveUserUseCase';
import LoginUseCase from 'src/Auth/LoginUseCase';
import RegisterUseCase from 'src/Auth/RegisterUseCase';

type UseCases = GetAllTasksUseCase | DeleteTask | SaveTaskUseCase | EditTaskUseCase | UserUseCase | LoginUseCase | RegisterUseCase;

@Injectable()
export default class UseCaseFactory extends ServiceFactory<UseCases> {}
