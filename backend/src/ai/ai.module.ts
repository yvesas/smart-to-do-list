import { Module } from "@nestjs/common";
import { AIService } from "./ai.service";
import { TogetherAIProvider } from "./together-ai.provider";
import { GeminiProvider } from "./gemini.provider";

@Module({
  providers: [AIService, TogetherAIProvider, GeminiProvider],
  exports: [AIService, TogetherAIProvider, GeminiProvider],
})
export class AIModule {}
