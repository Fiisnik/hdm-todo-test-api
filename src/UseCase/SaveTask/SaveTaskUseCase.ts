import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';
import SaveTaskDto from '../SaveTask/SaveTaskDto';

@Injectable()
export default class SaveTaskUseCase
  implements UseCase<Promise<Task>, [dto: SaveTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    try {
      if (!dto.name || dto.name.trim() === '') {
        throw new BadRequestException('The "name" field is required.');
      }

      if (!dto.userId) {
        throw new BadRequestException('The "userId" field is required.');
      }

      const task = await this.taskRepository.save({
        id: dto.id || undefined,
        name: dto.name,
        description: dto.description ?? null,
        priority: dto.priority,
        tag: dto.tag,
        userId: dto.userId,
      });

      return task;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
