import { TaskEntity } from "../task.entity";

export interface TaskRepository {
  create(task: Partial<TaskEntity>): Promise<TaskEntity>;
  findAll(): Promise<TaskEntity[]>;
  findById(id: string): Promise<TaskEntity | null>;
  update(id: string, task: Partial<TaskEntity>): Promise<TaskEntity>;
  delete(id: string): Promise<void>;
}
