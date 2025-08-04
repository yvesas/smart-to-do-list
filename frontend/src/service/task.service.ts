import { ApiService } from "@/lib/axios";
import type { Task } from "@/interfaces/task.interface";
import { CreateTaskInput, GenerateTasksInput } from "@/schemas/task.schema";

const api = new ApiService();

const getTasks = () => api.get<Task[]>("/tasks");

const createTask = (task: CreateTaskInput) => api.post<Task>("/tasks", task);

const generateTasks = (input: GenerateTasksInput) => api.post<Task[]>("/tasks/generate", input);

const updateTask = (id: string, task: Partial<Task>) => api.patch<Task>(`/tasks/${id}`, task);

const deleteTask = (id: string) => api.delete<void>(`/tasks/${id}`);

export const taskService = {
  getTasks,
  createTask,
  generateTasks,
  updateTask,
  deleteTask,
};
