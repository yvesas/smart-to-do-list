import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
} from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { GenerateTasksDto } from "./dto/generate-tasks.dto";

@ApiTags("tasks")
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post("generate")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Gerar tarefas via IA a partir de um objetivo" })
  @ApiResponse({ status: 200, description: "Tarefas geradas com sucesso." })
  @ApiBody({
    description:
      "Prompt de objetivo do usuário para geração de subtarefas via IA.",
    type: GenerateTasksDto,
    examples: {
      exemplo: {
        summary: "Prompt simples",
        value: { prompt: "Planejar uma viagem para o Japão" },
      },
    },
  })
  @ApiOkResponse({
    description: "Array de tarefas geradas pela IA.",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string", example: "Comprar passagens aéreas" },
          description: {
            type: "string",
            example: "Pesquisar voos e reservar para as datas desejadas",
            nullable: true,
          },
        },
      },
    },
  })
  async generateTasksByAI(@Body() dto: GenerateTasksDto) {
    return this.tasksService.generateTasksByAI(dto);
  }

  @Post()
  @ApiOperation({ summary: "Criar uma nova tarefa" })
  @ApiResponse({ status: 201, description: "Tarefa criada com sucesso." })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todas as tarefas" })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar uma tarefa por ID" })
  findOne(@Param("id") id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma tarefa" })
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Deletar uma tarefa" })
  remove(@Param("id") id: string) {
    return this.tasksService.remove(id);
  }
}
