import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { PrismaTaskRepository } from "./repositories/prisma-task.repository";
import { PrismaModule } from "../prisma.module/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService, PrismaTaskRepository],
  exports: [TasksService],
})
export class TasksModule {}
