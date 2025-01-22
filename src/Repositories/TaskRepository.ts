import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findById(id: number, userId: number) {
    return this.prisma.task.findFirst({
      where: { id, userId },
    });
  }

  async delete(id: number, userId: number) {
    const task = await this.findById(id, userId);
    if (!task) throw new Error('Task not found or not authorized');
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    if (!data.id) {
      return this.prisma.task.create({
        data: data as Prisma.TaskCreateInput,
      });
    }

    return this.prisma.task.update({
      where: {
        id: data.id as number,
      },
      data: data as Prisma.TaskUpdateInput,
    });
  }
}
