import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const TasksResponseSchema = z.object({
  tasks: z.array(TaskSchema).min(1),
});

export type Task = z.infer<typeof TaskSchema>;
export type TasksResponse = z.infer<typeof TasksResponseSchema>;
