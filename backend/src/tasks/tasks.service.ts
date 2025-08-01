import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaTaskRepository } from "./repositories/prisma-task.repository";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskEntity } from "./task.entity";
import { AIService } from "../ai/ai.service";
import { GenerateTasksDto } from "./dto/generate-tasks.dto";

@Injectable()
export class TasksService {
  constructor(
    private readonly taskRepository: PrismaTaskRepository,
    private readonly aiService: AIService
  ) {}
  async generateTasksByAI(dto: GenerateTasksDto) {
    return this.aiService.generateTasks(dto.prompt);
  }

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.create(createTaskDto);
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.findAll();
  }

  async findOne(id: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new NotFoundException("Task not found");
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: string): Promise<void> {
    return this.taskRepository.delete(id);
  }
}
