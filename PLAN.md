# Smart To-Do List - Plano de Ação Completo

## 📋 Visão Geral do Projeto

**Objetivo:** Desenvolver uma aplicação de lista de tarefas inteligente que utiliza IA para gerar subtarefas automáticas a partir de objetivos de alto nível.

---

## 🏗️ Fase 1: Configuração da Infraestrutura e Ambiente

### 1.1 Setup do Ambiente de Desenvolvimento

* [ ] **Docker Compose Setup**
  * Configurar `docker-compose.yml` para toda a stack
  * Container para Backend (NestJS)
  * Container para Frontend (Next.js)
  * Container para SQLite (ou volume persistente)
  * Network interno para comunicação entre serviços
  * **Ferramentas:** Docker, Docker Compose

### 1.2 Estrutura de Monorepo

* [ ] **Organização do Projeto**
  * Criar estrutura de pastas: `/backend`, `/frontend`, `/docker`
  * Configurar `package.json` na raiz para scripts globais
  * Setup de Prettier e ESLint compartilhado
  * **Ferramentas:** Yarn Workspaces ou npm workspaces

---

## 🔧 Fase 2: Backend - API com NestJS

### 2.1 Configuração Base do NestJS

* [ ] **Inicialização do Projeto**
  * Setup do NestJS com TypeScript
  * Configuração de variáveis de ambiente (.env)
  * Setup do Helmet para segurança básica
  * Configuração de CORS para comunicação com frontend
  * **Ferramentas:** NestJS CLI, dotenv, helmet, cors

### 2.2 Configuração do Banco de Dados

* [ ] **Prisma ORM Setup**
  * Instalação e configuração do Prisma
  * Configuração do SQLite como provider
  * Criação do schema inicial para Task
  * Geração do Prisma Client
  * **Ferramentas:** Prisma, SQLite
  * **Schema da Task:**

    prisma

    ```prisma
    model Task {
      id String @id @default(cuid())
      title String
      description String?
      isCompleted Boolean @default(false)
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
      parentId String? // Para tarefas geradas por IA
      isAiGenerated Boolean @default(false)
    }
    ```

### 2.3 Implementação da Arquitetura Clean

* [ ] **Camada de Domínio**
  * Entity: `TaskEntity` com regras de negócio
  * DTOs: `CreateTaskDto`, `UpdateTaskDto`, `GenerateTasksDto`
  * Interfaces: `TaskRepository`, `AIService`
  * **Design Pattern:** Domain-Driven Design (DDD)
* [ ] **Camada de Aplicação**
  * `TaskService` com toda lógica de negócio
  * `AITaskGeneratorService` para integração com IA
  * **Design Patterns:** Service Layer, Dependency Injection
* [ ] **Camada de Infraestrutura**
  * `PrismaTaskRepository` implementando `TaskRepository`
  * `HuggingFaceAIService` ou `OpenRouterAIService`
  * **Design Patterns:** Repository Pattern, Adapter Pattern
* [ ] **Camada de Apresentação**
  * `TaskController` com endpoints RESTful
  * Validação com class-validator nos DTOs
  * Interceptors para tratamento de erros
  * **Design Patterns:** Controller Pattern, Validation Pattern

### 2.4 Endpoints da API

* [ ] **CRUD Básico de Tarefas**
  * `POST /tasks` - Criar tarefa manual
  * `GET /tasks` - Listar todas as tarefas
  * `GET /tasks/:id` - Buscar tarefa específica
  * `PATCH /tasks/:id` - Atualizar tarefa (toggle completed)
  * `DELETE /tasks/:id` - Deletar tarefa
  * **Padrões:** RESTful API, HTTP Status Codes
* [ ] **Endpoint de IA**
  * `POST /tasks/generate` - Gerar tarefas via IA
  * Input: `{ prompt: string, parentTaskTitle?: string }`
  * Output: Array de tarefas criadas
  * **Integração:** API externa de LLM

### 2.5 Integração com Serviços de IA

* [ ] **Provider de IA**
  * Implementar client para Hugging Face Inference API
  * Fallback para OpenRouter se necessário
  * Tratamento de rate limits e timeouts
  * **Ferramentas:** axios, retry logic
* [ ] **Prompt Engineering**
  * Template de prompt estruturado para gerar tarefas
  * Parsing da resposta JSON da IA
  * Validação das tarefas geradas
  * **Técnicas:** Few-shot prompting, JSON schema validation

---

## 🎨 Fase 3: Frontend - Interface com Next.js

### 3.1 Configuração Base do Next.js

* [ ] **Setup do Projeto**
  * Inicialização com TypeScript
  * Configuração do Tailwind CSS
  * Setup do shadcn/ui
  * Configuração de fonts e tema global
  * **Ferramentas:** Next.js 14, TypeScript, Tailwind, shadcn/ui

### 3.2 Gerenciamento de Estado

* [ ] **Zustand Store**
  * Store para tarefas (`TaskStore`)
  * Actions: create, update, delete, toggleComplete
  * Store para IA (`AIStore`) - loading states, errors
  * **Design Pattern:** State Management Pattern

### 3.3 Validação de Dados

* [ ] **Schemas com Zod**
  * Schema para criação de tarefa
  * Schema para prompt de IA
  * Validação de formulários
  * **Ferramentas:** Zod, react-hook-form

### 3.4 Componentes da Interface

* [ ] **Layout e Estrutura**
  * `Layout` component com header e container
  * `TaskList` component para exibir tarefas
  * `TaskItem` component individual
  * **Design Patterns:** Component Composition
* [ ] **Formulários**
  * `CreateTaskForm` para tarefas manuais
  * `AIPromptForm` para geração por IA
  * Validação em tempo real
  * **Componentes shadcn:** Form, Input, Button, Textarea
* [ ] **Estados de Loading e Feedback**
  * Loading spinners durante requisições
  * Toast notifications para feedback
  * Error boundaries para erros
  * **Componentes shadcn:** Toast, Skeleton, Alert

### 3.5 Integração com API

* [ ] **Cliente HTTP**
  * Configuração de axios com baseURL
  * Interceptors para tratamento de erros
  * Types TypeScript para responses
  * **Design Pattern:** API Client Pattern
* [ ] **React Query/SWR (Opcional)**
  * Cache de requisições
  * Sincronização automática
  * **Ferramentas:** @tanstack/react-query ou SWR

---

## 🔐 Fase 4: Segurança e Performance

### 4.1 Segurança Backend

* [ ] **Configurações Básicas**
  * Rate limiting com express-rate-limit
  * Helmet para headers de segurança
  * Validação rigorosa de inputs
  * Sanitização de dados para IA
  * **Ferramentas:** helmet, express-rate-limit, class-validator

### 4.2 Performance Backend

* [ ] **Otimizações**
  * Caching de respostas frequentes
  * Paginação na listagem de tarefas
  * Índices no banco de dados
  * Compressão de responses
  * **Ferramentas:** cache-manager, compression

### 4.3 Performance Frontend

* [ ] **Otimizações Next.js**
  * Lazy loading de componentes
  * Otimização de imagens
  * Bundle analysis
  * **Ferramentas:** next/dynamic, @next/bundle-analyzer

---

## 🧪 Fase 5: Testes e Qualidade

### 5.1 Testes Backend

* [ ] **Testes Unitários**
  * Services com Jest
  * Repository com mocks
  * **Coverage:** >80%
* [ ] **Testes de Integração**
  * Endpoints da API
  * Integração com banco de dados
  * **Ferramentas:** supertest, jest

### 5.2 Testes Frontend

* [ ] **Testes de Componentes**
  * React Testing Library
  * Testes de formulários
  * **Ferramentas:** Jest, RTL

---

## 🚀 Fase 6: Deploy e Monitoramento

### 6.1 Docker Production

* [ ] **Multi-stage Builds**
  * Dockerfile otimizado para produção
  * Docker compose para production
  * Health checks nos containers

### 6.2 Documentação

* [ ] **API Documentation**
  * Swagger/OpenAPI para backend
  * README detalhado
  * Guia de setup local

---

## 🛠️ Tecnologias e Ferramentas Resumo

### Backend Stack

* **Framework:** NestJS + TypeScript
* **ORM:** Prisma
* **Database:** SQLite
* **Validation:** class-validator, class-transformer
* **Security:** Helmet, CORS, Rate Limiting
* **AI Integration:** Axios (Hugging Face/OpenRouter)
* **Testing:** Jest, Supertest

### Frontend Stack

* **Framework:** Next.js 14 + TypeScript
* **Styling:** Tailwind CSS + shadcn/ui
* **State Management:** Zustand
* **Validation:** Zod + react-hook-form
* **HTTP Client:** Axios
* **Testing:** Jest + React Testing Library

### DevOps Stack

* **Containerization:** Docker + Docker Compose
* **Code Quality:** ESLint + Prettier
* **Package Manager:** npm/yarn workspaces

### Design Patterns Utilizados

* **Backend:** Repository Pattern, Service Layer, Dependency Injection, Adapter Pattern
* **Frontend:** Component Composition, State Management, API Client Pattern
* **Architecture:** Clean Architecture (Backend), Atomic Design (Frontend)

---

## 📊 Timeline Estimado

* **Fase 1-2 (Backend):** 2-3 semanas
* **Fase 3 (Frontend):** 2 semanas
* **Fase 4-5 (Segurança/Testes):** 1 semana
* **Fase 6 (Deploy):** 3-5 dias

**Total Estimado:** 5-6 semanas para um desenvolvedor senior

---

## ✅ Checklist de Entrega Final

* [ ] Docker compose funcional com toda a stack
* [ ] API REST completamente funcional
* [ ] Interface responsiva e intuitiva
* [ ] Integração com IA funcionando
* [ ] Testes básicos implementados
* [ ] Documentação completa
* [ ] Código seguindo boas práticas e padrões estabelecidos





Pode revisar o codigo do @apps/web/app/routes/adm.atualizacoescadastrais.tsx, @apps/web/app/routes/adm.atualizacoescadastrais_.$id.detail.tsx, @apps/api/src/registration-update/, e no mobile @apps/mobile/src/screens/registrationUpdateScreen. Adicione arquivos, que precisam participar da aanalsie, eemplo schemas primsa ou zod,dtos, etc. Analise e veja diferenças para PF e PJ, considerando que PF está mais atualziado e mais perto do que deve ser o concluido; Alem **disso descreva brevemente cada endpoint da api, e cada parte das telas, em seu espectivos grupos de "dominio"(conjunt de informações) e cada **tela do projeto Mobile; Crie um documento markdown na raiz do projeto para salvar seu relatorio. Aproveite a documetnação, mesmo que possa estar desatualzada: @REGISTRATION_UPDATE_PF_PLAN.md e @REGISTRATION_UPDATE_PJ_PLAN.md. Pode revisar o codigo do @apps/web/app/routes/adm.atualizacoescadastrais.tsx, @apps/web/app/routes/adm.atualizacoescadastrais_.$id.detail.tsx, @apps/api/src/registration-update/, e no mobile @apps/mobile/src/screens/registrationUpdateScreen. Adicione arquivos, que precisam participar da aanalsie, eemplo schemas primsa ou zod, dtos, etc. Analise e veja diferenças para PF e PJ, considerando que PF está mais atualziado e mais perto do que deve ser o concluido; Alem disso descreva brevemente cada endpoint da api, e cada parte das telas, em seu espectivos grupos de "dominio"(conjunt de informações) e cada tela do projeto Mobile; Crie um documento markdown na raiz do projeto para salvar seu relatorio. Aproveite a documetnação, mesmo que possa estar desatualzada: @REGISTRATION_UPDATE_PF_PLAN.md e @REGISTRATION_UPDATE_PJ_PLAN.md.
