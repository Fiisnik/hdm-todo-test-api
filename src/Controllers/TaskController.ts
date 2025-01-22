import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../Auth/JwtAuthGuard';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import SaveTaskUseCase from 'src/UseCase/SaveTask/SaveTaskUseCase';
import EditTaskUseCase from 'src/UseCase/EditTask/EditTaskUseCase';

@Controller('/tasks')
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll(@Request() req: any) {
    const userId = req.user.userId; 
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() dto: SaveTaskDto, @Request() req: any) {
    const userId = req.user.userId;
    dto.userId = userId; 
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto, @Request() req: any) {
    const userId = req.user.userId;
    dto.userId = userId; 
    return (await this.useCaseFactory.create(EditTaskUseCase)).handle(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.userId;
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id), userId);
  }
}
