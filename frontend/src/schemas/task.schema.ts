import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(100, "Title cannot exceed 100 characters."),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),
});

export const GenerateTasksSchema = z.object({
  prompt: z
    .string()
    .min(10, "The objective must be at least 10 characters long.")
    .max(200, "The objective cannot exceed 200 characters."),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type GenerateTasksInput = z.infer<typeof GenerateTasksSchema>;
