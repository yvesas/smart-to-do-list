/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { AIProvider } from './ai.interface';
import { GoogleGenAI } from '@google/genai';
import { TaskPromptBuilder } from './task-prompt.builder';
import { TasksResponseSchema, Task } from './task.schema';

@Injectable()
export class GeminiProvider implements AIProvider {
  private genAI: any;

  constructor() {
    this.genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async generateTasks(prompt: string): Promise<Task[]> {
    try {
      const response = await this.genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: TaskPromptBuilder.build(prompt),
      });
      let text =
        response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text;
      Logger.log('[GEMINI] Texto gerado:', text);

      if (text.startsWith('```json')) {
        text = text.slice(7, -3).trim();
      }

      let tasks: Task[] = [];
      try {
        const parsed = JSON.parse(text);
        const validated = TasksResponseSchema.parse(parsed);
        tasks = validated.tasks;
      } catch (jsonErr) {
        tasks = text
          .split('\n')
          .map(t => t.trim())
          .filter(Boolean)
          .map(t => ({ title: t }));
      }
      if (!Array.isArray(tasks) || tasks.length === 0) {
        throw new Error('Nenhuma task encontrada na resposta da IA.');
      }
      return tasks;
    } catch (error) {
      Logger.error('[GEMINI] Error to generate tasks from GeminiAI:', error);
      throw new Error('Failed to generate tasks from Gemini AI.');
    }
  }
}
