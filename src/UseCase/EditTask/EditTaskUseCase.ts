import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';
import SaveTaskDto from '../SaveTask/SaveTaskDto';

@Injectable()
export default class EditTaskUseCase
  implements UseCase<Promise<Task>, [id: number, dto: SaveTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(id: number, dto: SaveTaskDto): Promise<Task> {
    try {
      if (!id) {
        throw new BadRequestException('Task ID is required for update');
      }

      if (!dto.userId) {
        throw new BadRequestException('User ID is required.');
      }

      const existingTask = await this.taskRepository.findById(id, dto.userId);
      if (!existingTask) {
        throw new BadRequestException(
          `Task with ID ${id} does not exist or you are not authorized to edit it.`,
        );
      }

      if (!dto.name || dto.name.trim() === '') {
        throw new BadRequestException('The "name" field is required.');
      }

      return await this.taskRepository.save({
        id: existingTask.id,
        name: dto.name,
        priority: dto.priority,
        tag: dto.tag,
        description: dto.description ?? existingTask.description,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
