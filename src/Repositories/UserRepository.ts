import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, User } from '@prisma/client';

@Injectable()
export default class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async save(
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput> | Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>,
  ): Promise<User> {
    if (!data.id) {
      return this.prisma.user.create({
        data: data as Prisma.UserCreateInput,
      });
    }

    return this.prisma.user.update({
      where: {
        id: data.id as number,
      },
      data: data as Prisma.UserUpdateInput,
    });
  }
}
