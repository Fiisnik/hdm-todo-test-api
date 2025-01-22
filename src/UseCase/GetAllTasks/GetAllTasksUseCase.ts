import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class GetAllTasksUseCase
  implements UseCase<Promise<Task[]>, [userId: number]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(userId: number): Promise<Task[]> {
    try {
      if (!userId) {
        throw new BadRequestException('User ID is required.');
      }

      return this.taskRepository.findAll(userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
