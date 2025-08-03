/* eslint-disable prettier/prettier */
export class TaskPromptBuilder {
  static build(userPrompt: string): string {
    const schema =
      '{ "tasks": [ { "title": "string", "description": "string opcional" } ] }';

    const examples = [
      {
        input: 'Preparar uma apresentação para o trabalho',
        output: `{
  "tasks": [
    { "title": "Definir tema e objetivos", "description": "Esclarecer o propósito e mensagem principal" },
    { "title": "Pesquisar conteúdo", "description": "Coletar dados, estatísticas e referências" },
    { "title": "Criar estrutura", "description": "Organizar tópicos e fluxo da apresentação" },
    { "title": "Desenvolver slides", "description": "Criar apresentação visual no software escolhido" },
    { "title": "Ensaiar apresentação", "description": "Praticar timing e postura" }
  ]
}`,
      },
      {
        input: 'Organizar uma festa de aniversário',
        output: `{
  "tasks": [
    { "title": "Definir orçamento e data" },
    { "title": "Criar lista de convidados", "description": "Definir quantas pessoas e enviar convites" },
    { "title": "Escolher local", "description": "Reservar espaço adequado para o número de pessoas" },
    { "title": "Planejar cardápio", "description": "Definir comidas, bebidas e bolo" },
    { "title": "Organizar decoração", "description": "Comprar ou preparar itens decorativos" },
    { "title": "Preparar atividades", "description": "Música, jogos ou entretenimento" }
  ]
}`,
      },
    ];

    const examplesText = examples
      .map(ex => `EXEMPLO:\nObjetivo: ${ex.input}\nResposta: ${ex.output}`)
      .join('\n\n');

    return [
      'Você é um assistente de produtividade especialista em gerar respostas em formato JSON.',
      `Sua tarefa é criar uma lista de tarefas e subtarefas com base no objetivo do usuário.`,
      `A sua resposta DEVE ser um objeto JSON válido, e NADA MAIS. Não inclua explicações, comentários, ou formatação markdown como \`\`\`json.`,
      `O JSON deve seguir estritamente o seguinte formato: ${schema}`,
      '',
      examplesText,
      '',
      '---',
      'OBJETIVO DO USUÁRIO:',
      userPrompt.trim(),
    ].join('\n');
  }
}
