/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { CreateTaskInput, GenerateTasksInput } from "@/schemas/task.schema";
import { taskService } from "@/service/task.service";
import type { Task } from "@/interfaces/task.interface";
import Error from "next/error";

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (newTask: CreateTaskInput) => Promise<void>;
  generateAndAddTasks: (input: GenerateTasksInput) => Promise<void>;
  toggleTask: (id: string | undefined) => Promise<void>;
  deleteTask: (id: string | undefined) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await taskService.getTasks();
      set({ tasks, isLoading: false });
    } catch (e: Error | any) {
      console.error("Failed to fetch tasks:", e);
      set({ error: "Falha ao buscar tarefas.", isLoading: false });
    }
  },

  createTask: async (newTask) => {
    set({ isLoading: true });
    try {
      const createdTask = await taskService.createTask(newTask);
      set((state) => ({
        tasks: [...state.tasks, createdTask],
        isLoading: false,
      }));
    } catch (e: Error | any) {
      console.error("Failed to create task:", e);
      set({ error: "Falha ao criar tarefa.", isLoading: false });
    }
  },

  generateAndAddTasks: async (input) => {
    set({ isLoading: true });
    try {
      const generatedTasks = await taskService.generateTasks(input);
      set((state) => ({
        tasks: [...state.tasks, ...generatedTasks],
        isLoading: false,
      }));
    } catch (e: Error | any) {
      console.error("Failed to generate tasks:", e);
      set({ error: "Falha ao gerar tarefas com IA.", isLoading: false });
    }
  },

  toggleTask: async (taskId) => {
    if (!taskId) return;
    const originalTasks = get().tasks;
    const task = originalTasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
    }));

    try {
      await taskService.updateTask(taskId, {
        isCompleted: updatedTask.isCompleted,
      });
    } catch (e: Error | any) {
      console.error("Failed to update task:", e);
      set({ tasks: originalTasks, error: "Falha ao atualizar tarefa." });
    }
  },

  deleteTask: async (taskId) => {
    if (!taskId) return;
    const originalTasks = get().tasks;
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== taskId) }));
    try {
      await taskService.deleteTask(taskId);
    } catch (e: Error | any) {
      console.error("Failed to delete task:", e);
      set({ tasks: originalTasks, error: "Falha ao deletar tarefa." });
    }
  },
}));
