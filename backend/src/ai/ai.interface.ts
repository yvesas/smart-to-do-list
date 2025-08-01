export interface AIProvider {
  generateTasks(
    prompt: string
  ): Promise<{ title: string; description?: string }[]>;
}
