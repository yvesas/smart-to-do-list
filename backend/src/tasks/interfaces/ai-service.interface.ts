export interface AIService {
  generateTasks(
    prompt: string,
    parentTaskTitle?: string
  ): Promise<{ title: string; description?: string }[]>;
}
