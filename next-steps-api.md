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
