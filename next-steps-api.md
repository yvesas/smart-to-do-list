# Proximos Passos API

### 1. Configuração de Ambiente e Segurança

* Criar o arquivo `.env` para variáveis sensíveis (ex: URLs de IA, configs do banco).
* Configurar o uso do `@nestjs/config` para ler variáveis de ambiente.
* Adicionar e configurar Helmet e CORS no app principal.

### 2. Banco de Dados e Prisma

* Instalar e configurar o Prisma no backend.
* Criar o schema inicial do banco (modelo `Task` conforme especificação).
* Rodar as migrações e gerar o Prisma Client.

### 3. Estrutura de Domínio e Clean Architecture

* Criar a entity `TaskEntity` e os DTOs (`CreateTaskDto`, `UpdateTaskDto`, `GenerateTasksDto`).
* Definir interfaces para `TaskRepository` e `AIService`.
* Implementar o repositório com Prisma (`PrismaTaskRepository`).

### 4. Lógica de Negócio e Serviços

* Implementar o `TaskService` (CRUD de tarefas).
* Implementar o `AITaskGeneratorService` para integração com IA.

### 5. Controllers e Endpoints

* Criar o `TaskController` com endpoints RESTful:
  * `POST /tasks`
  * `GET /tasks`
  * `GET /tasks/:id`
  * `PATCH /tasks/:id`
  * `DELETE /tasks/:id`
  * `POST /tasks/generate` (IA)

### 6. Integração com IA

* Implementar client paraTogether AI ou Gemini usando Axios.
* Criar lógica de prompt e parsing da resposta da IA.

### 7. Validação, Interceptação e Tratamento de Erros

* Usar class-validator nos DTOs.
* Adicionar interceptors para tratamento global de erros.

### 8. Testes

* Configurar e criar testes unitários e de integração (Jest, Supertest).

---



## Próximos Passos para Conclusão da API

### 1. **Rate Limiting e Fallback Inteligente na IA**

* Implemente lógica de rate limit e fallback no [AIService](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html):
  * Tente o provider principal (Gemini/Google AI Studio).
  * Se receber erro de rate limit (HTTP 429) ou falha, faça fallback automático para o provider secundário (ex: TogetherAI ou Hugging Face).
  * Exemplo de estrutura já sugerida no seu prompt.

### 2. **Endpoint REST para Geração de Tarefas via IA**

* Crie um endpoint no controller de tarefas:
  * `POST /tasks/generate`
  * Recebe `{ prompt: string }` (valide com DTO/class-validator).
  * Chama o serviço de IA ([AIService.generateWithFallback](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html)).
  * Retorna as tarefas geradas (array de objetos `{ title, description? }`).
  * Opcional: já persista as tarefas no banco, marcando como `isAiGenerated: true`.

### 3. **Validação e Segurança**

* Use DTOs e class-validator para validar o input do usuário.
* Limite o tamanho do prompt recebido.
* (Opcional) Adicione rate limit global no endpoint para evitar abuso.

### 4. **Documentação Swagger**

* Documente o novo endpoint no Swagger para facilitar testes e integração frontend.

### 5. **Testes**

* Crie testes unitários para o serviço de IA e para o controller.
* Teste o fallback e o tratamento de erros.
