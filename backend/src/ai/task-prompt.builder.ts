export class TaskPromptBuilder {
  static build(userPrompt: string): string {
    return [
      "Você é um assistente de produtividade. Sua trabalho é gerar uma lista de tarfas e subtarefas claras, objetivas e acionáveis para o objetivo informado pelo usuário.",
      "Responda SOMENTE com um JSON no formato:",
      '{ "tasks": [ { "title": "string", "description": "string opcional" }, ... ] }',
      "Não adicione explicações, apenas o JSON.",
      "Objetivo do usuário:",
      userPrompt.trim(),
    ].join("\n\n");
  }
}
