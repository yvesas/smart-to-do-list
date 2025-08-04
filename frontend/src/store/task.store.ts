import { create } from "zustand";
import { toast } from "sonner";
import { taskService } from "@/service/task.service";
import type { Task } from "@/interfaces/task.interface";
import { CreateTaskInput, GenerateTasksInput } from "@/schemas/task.schema";

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (newTask: CreateTaskInput) => Promise<void>;
  generateTasks: (input: GenerateTasksInput) => Promise<void>;
  toggleTask: (id: string | undefined) => Promise<void>;
  deleteTask: (id: string | undefined) => Promise<void>;
}

const handleApiCall = async <T>(
  apiCall: () => Promise<T>,
  set: (partial: Partial<TaskState>) => void,
  successMessage: string
): Promise<T | null> => {
  set({ isLoading: true, error: null });
  try {
    const result = await apiCall();
    toast.success(successMessage);
    set({ isLoading: false });
    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    toast.error(errorMessage);
    set({ error: errorMessage, isLoading: false });
    return null;
  }
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    const tasks = await handleApiCall(
      () => taskService.getTasks(),
      set,
      "Tasks fetched successfully"
    );
    if (tasks) {
      set({ tasks });
    }
  },

  createTask: async (newTask) => {
    const createdTask = await handleApiCall(
      () => taskService.createTask(newTask),
      set,
      "Task created successfully"
    );
    if (createdTask) {
      set((state) => ({ tasks: [...state.tasks, createdTask] }));
    }
  },

  generateTasks: async (input) => {
    const generatedTasks = await handleApiCall(
      () => taskService.generateTasks(input),
      set,
      "Tasks generated successfully"
    );
    if (generatedTasks) {
      set((state) => ({ tasks: [...state.tasks, ...generatedTasks] }));
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

    const result = await handleApiCall(
      () =>
        taskService.updateTask(taskId, {
          isCompleted: updatedTask.isCompleted,
        }),
      set,
      "Task updated successfully"
    );

    if (!result) {
      set({ tasks: originalTasks });
    }
  },

  deleteTask: async (taskId) => {
    if (!taskId) return;
    const originalTasks = get().tasks;
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== taskId) }));

    const result = await handleApiCall(
      () => taskService.deleteTask(taskId),
      set,
      "Task deleted successfully"
    );

    if (!result) {
      set({ tasks: originalTasks });
    }
  },
}));
