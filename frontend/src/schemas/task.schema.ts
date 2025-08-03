import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter no mínimo 3 caracteres.")
    .max(100, "O título deve ter no máximo 100 caracteres."),
  description: z
    .string()
    .max(500, "A descrição não pode exceder 500 caracteres.")
    .optional(),
});

export const GenerateTasksSchema = z.object({
  prompt: z
    .string()
    .min(10, "O objetivo deve ter no mínimo 10 caracteres.")
    .max(200, "O objetivo deve ter no máximo 200 caracteres."),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type GenerateTasksInput = z.infer<typeof GenerateTasksSchema>;
