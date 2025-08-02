/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AIService } from './ai.service';
import { TogetherAIProvider } from './together-ai.provider';
import { GeminiProvider } from './gemini.provider';
import { Logger } from '@nestjs/common';

describe('AIService', () => {
  let aiService: AIService;
  let togetherAIProvider: jest.Mocked<TogetherAIProvider>;
  let geminiProvider: jest.Mocked<GeminiProvider>;
  let logger: jest.Mocked<Logger>;

  beforeEach(async () => {
    togetherAIProvider = {
      generateTasks: jest.fn(),
    } as any;

    geminiProvider = {
      generateTasks: jest.fn(),
    } as any;

    logger = {
      warn: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AIService,
        { provide: TogetherAIProvider, useValue: togetherAIProvider },
        { provide: GeminiProvider, useValue: geminiProvider },
        { provide: Logger, useValue: logger },
      ],
    }).compile();

    aiService = module.get<AIService>(AIService);
  });

  it('should use the primary provider to generate tasks', async () => {
    process.env.AI_PRIMARY_PROVIDER = 'together';
    const expectedTasks = [{ title: 'Task 1' }, { title: 'Task 2' }];
    togetherAIProvider.generateTasks.mockResolvedValue(expectedTasks);

    const result = await aiService.generateTasks('Test prompt');

    expect(togetherAIProvider.generateTasks).toHaveBeenCalledWith(
      'Test prompt',
    );
    expect(result).toEqual(expectedTasks);
  });

  it('should fallback to the secondary provider if the primary fails', async () => {
    process.env.AI_PRIMARY_PROVIDER = 'together';
    process.env.AI_FALLBACK_PROVIDER = 'gemini';
    const fallbackTasks = [{ title: 'Fallback Task 1' }];
    togetherAIProvider.generateTasks.mockRejectedValue(
      new Error('Primary failed'),
    );
    geminiProvider.generateTasks.mockResolvedValue(fallbackTasks);

    const result = await aiService.generateTasks('Test prompt');

    expect(togetherAIProvider.generateTasks).toHaveBeenCalledWith(
      'Test prompt',
    );
    expect(geminiProvider.generateTasks).toHaveBeenCalledWith('Test prompt');
    expect(result).toEqual(fallbackTasks);
  });

  it('should log a warning when the primary provider fails', async () => {
    process.env.AI_PRIMARY_PROVIDER = 'together';
    process.env.AI_FALLBACK_PROVIDER = 'gemini';
    const fallbackTasks = [{ title: 'Fallback Task 1' }];
    togetherAIProvider.generateTasks.mockRejectedValue(
      new Error('Primary failed'),
    );
    geminiProvider.generateTasks.mockResolvedValue(fallbackTasks);

    await aiService.generateTasks('Test prompt');

    expect(logger.warn).toHaveBeenCalledWith(
      'Primary AI provider failed: Primary failed. Trying fallback...',
    );
  });
});