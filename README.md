# Smart To-Do List

Uma aplicação de lista de tarefas inteligente que utiliza IA para gerar subtarefas automáticas a partir de objetivos de alto nível do usuário.

## Estrutura do Monorepo

- **backend/**: API desenvolvida em NestJS + TypeScript, com ORM Prisma e banco de dados SQLite. Responsável pela lógica de negócios, persistência de dados e integração com serviços de IA (ex: Hugging Face, OpenRouter).
- **frontend/**: Interface web desenvolvida em Next.js + TypeScript, com Tailwind CSS, shadcn/ui, Zustand para gerenciamento de estado e Zod para validação de dados. Permite criar, listar, atualizar, excluir tarefas e gerar subtarefas via IA.
- **docker-compose.yml**: Orquestra toda a stack (backend, frontend e banco de dados) via Docker.

## Tecnologias Utilizadas

- **Backend:**
  - NestJS (TypeScript)
  - Prisma ORM
  - SQLite
  - class-validator, class-transformer
  - Helmet, CORS, express-rate-limit
  - Integração com IA via Axios

- **Frontend:**
  - Next.js 14 (TypeScript)
  - Tailwind CSS, shadcn/ui
  - Zustand, Zod, react-hook-form
  - Axios, React Query

- **DevOps:**
  - Docker, Docker Compose
  - pnpm (gerenciador de pacotes)

## Como iniciar o projeto

1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. Na raiz do projeto, execute:

```sh
docker compose up --build
```

- O frontend estará disponível em http://localhost:3000
- O backend (API) estará disponível em http://localhost:3001

## Sobre o Projeto

O Smart To-Do List vai além do CRUD tradicional, permitindo que o usuário descreva um objetivo de alto nível (ex: "planejar uma viagem") e receba automaticamente uma lista de subtarefas geradas por IA. O backend processa o prompt, comunica-se com um serviço de LLM e persiste as tarefas geradas. O frontend exibe e gerencia as tarefas de forma reativa e intuitiva.

---

> Para detalhes completos de arquitetura, endpoints e roadmap, consulte os arquivos `PLAN.md` e `project-description.md`.
--- 
