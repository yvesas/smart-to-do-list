# Smart To-Do List

#### Sobre

O objetivo é desenvolver uma "Smart To-Do List", uma lista de tarefas que vai além do CRUD tradicional. A aplicação deverá integrar uma funcionalidade de Inteligência Artificial que, a partir de um objetivo de alto nível descrito pelo usuário (como "planejar uma viagem"), gera automaticamente uma lista de subtarefas acionáveis. Devemos criar uma aplicação completa, desde a API robusta no backend até uma interface reativa no frontend.

#### **Stacks Tecnológicas Requeridas**

A seguir, detalho as responsabilidades e os requisitos para cada parte da stack tecnológica obrigatória.
Criar docker compose para subir todo o projeto.
Nesta primeira versão ter somente acesso direto, sem controle de acesso e ou autenticação.

---

## **Backend: NestJS com TypeScript**

O backend será o cérebro da aplicação, responsável pela lógica de negócios, persistência de dados e, crucialmente, pela comunicação com a API de Inteligência Artificial. A arquitetura da API (endpoints, métodos, etc.) devem seguir com entity, dtos para class validator, repository, service, controller e module, uso de ORM com Prisma.

* **Lógica de Negócios:** Implementar toda a funcionalidade para gerenciar o ciclo de vida de tarefas:
  * Criação
  * Leitura ou listagem
  * Atualização (ex: marcar como concluída)
  * Exclusão
* **Persistência de Dados:** Utilizar **SQLite** como banco de dados para garantir a simplicidade e a portabilidade do projeto. O modelo da tarefa deve incluir, no mínimo: `title`, `isCompleted` e `createdAt`. E um campo opcional com a descrição mais detalhada do item da lista TO-DO, onde o usuário poderem descrever ou ter anotado vindo da IA.
* **Integração com IA:**
  * Desenvolver um endpoint na API que receba um prompt do usuário.
  * Implementar a lógica para se comunicar com uma API de Inferência de um LLM (ex: Hugging Face, OpenRouter, ou qualquer provedor que ofereça inferências gratuitas), enviando o prompt do usuário de forma estruturada.
  * Processar a resposta da IA, extrair as tarefas geradas e persisti-las no banco de dados.

---

## **Frontend: Next.js com TypeScript**

O frontend será a interface com a qual o usuário interage. Deve ser reativa e intuitiva, consumindo a API criada. Utilizar Zod para a validação dos campos.
Para estilização utilizar Tailwind e shadcn.

* **Gerenciamento de Estado:** Exibir e gerenciar a lista de tarefas de forma eficiente, refletindo em tempo real as criações, atualizações e exclusões. Utilizar zustand.
* **Interatividade com o Usuário:**
  * Permitir a criação de tarefas através de um formulário simples.
  * Permitir que o usuário marque/desmarque tarefas como concluídas.
  * Implementar a funcionalidade para deletar tarefas.
* **Funcionalidade de IA:**
  * Criar um componente de interface claro com um campo de texto e um botão para que o usuário possa descrever seu objetivo.
  * Ao acionar o botão, fazer a chamada para o endpoint correspondente no backend.
  * Atualizar a lista de tarefas na tela com as novas tarefas retornadas pela API, sem a necessidade de recarregar a página.

---
