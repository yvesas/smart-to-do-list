import { Injectable } from "@nestjs/common";
import { AIProvider } from "./ai.interface";
import TogetherAI from "together-ai";
import { TaskPromptBuilder } from "./task-prompt.builder";
import { TasksResponseSchema, Task } from "./task.schema";

@Injectable()
export class TogetherAIProvider implements AIProvider {
  private client: any;

  constructor() {
    this.client = new TogetherAI({
      apiKey: process.env.TOGETHER_API_KEY,
    });
  }

  async generateTasks(prompt: string): Promise<Task[]> {
    try {
      const response = await this.client.chat.completions.create({
        model: "togethercomputer/llama-2-70b-chat",
        messages: [{ role: "user", content: TaskPromptBuilder.build(prompt) }],
        max_tokens: 512,
        temperature: 0.7,
      });
      if (!response || !response.choices || !response.choices[0].message) {
        throw new Error("Failed to generate tasks from Together AI.");
      }
      const text = response.choices[0].message.content;
      console.log("[TOGETHER-AI] Texto gerado:", text);
      let tasks: Task[] = [];
      try {
        const parsed = JSON.parse(text);
        const validated = TasksResponseSchema.parse(parsed);
        tasks = validated.tasks;
      } catch (jsonErr) {
        tasks = text
          .split("\n")
          .map((t) => t.trim())
          .filter(Boolean)
          .map((t) => ({ title: t }));
      }
      if (!Array.isArray(tasks) || tasks.length === 0) {
        throw new Error("Nenhuma task encontrada na resposta da IA [T].");
      }
      return tasks;
    } catch (error) {
      console.error(
        "[TOGETHER-AI] Error to generate tasks from TogetherAI:",
        error
      );
      throw new Error("Failed to generate tasks from Together AI.");
    }
  }
}
