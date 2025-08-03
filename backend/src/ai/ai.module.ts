import { Module, Logger } from '@nestjs/common';
import { AIService } from './ai.service';
import { TogetherAIProvider } from './providers/together-ai.provider';
import { GeminiProvider } from './providers/gemini.provider';

@Module({
  providers: [AIService, TogetherAIProvider, GeminiProvider, Logger],
  exports: [AIService, TogetherAIProvider, GeminiProvider],
})
export class AIModule {}
