import { Injectable, Logger } from "@nestjs/common";
import { TogetherAIProvider } from "./together-ai.provider";
import { GeminiProvider } from "./gemini.provider";
import { AIProvider } from "./ai.interface";

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private readonly providers: Record<string, AIProvider>;

  constructor(
    private togetherAI: TogetherAIProvider,
    private gemini: GeminiProvider
  ) {
    this.providers = {
      together: this.togetherAI,
      gemini: this.gemini,
    };
  }

  async generateTasks(prompt: string) {
    const primary = process.env.AI_PRIMARY_PROVIDER || "together";
    const fallback = process.env.AI_FALLBACK_PROVIDER || "gemini";

    try {
      return await this.providers[primary].generateTasks(prompt);
    } catch (error) {
      this.logger.warn(
        `Primary AI provider failed: ${error.message}. Trying fallback...`
      );
      return await this.providers[fallback].generateTasks(prompt);
    }
  }
}
