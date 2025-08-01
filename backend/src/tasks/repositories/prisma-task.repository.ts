import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../task.entity';
import { TaskRepository } from '../interfaces/task-repository.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { PrismaService } from '../../prisma.module/prisma.service';

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: CreateTaskDto): Promise<TaskEntity> {
    return this.prisma.task.create({ data: task });
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.prisma.task.findMany();
  }

  async findById(id: string): Promise<TaskEntity | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async update(id: string, task: Partial<TaskEntity>): Promise<TaskEntity> {
    return this.prisma.task.update({ where: { id }, data: task });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}
