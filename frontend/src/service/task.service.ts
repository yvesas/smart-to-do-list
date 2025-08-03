import { ApiService } from "@/lib/axios";
import type { Task } from "@/interfaces/task.interface";
import { CreateTaskInput, GenerateTasksInput } from "@/schemas/task.schema";

const api = new ApiService();

const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get("/tasks");
  return data;
};

const createTask = async (task: CreateTaskInput): Promise<Task> => {
  const { data } = await api.post("/tasks", task);
  return data;
};

const generateTasks = async (input: GenerateTasksInput): Promise<Task[]> => {
  const { data } = await api.post("/tasks/generate", input);
  return data;
};

const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  const { data } = await api.patch(`/tasks/${id}`, task);
  return data;
};

const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const taskService = {
  getTasks,
  createTask,
  generateTasks,
  updateTask,
  deleteTask,
};
