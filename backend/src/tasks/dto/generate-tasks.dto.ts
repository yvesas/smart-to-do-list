import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GenerateTasksDto {
  @ApiProperty({
    description:
      'Prompt de objetivo do usuário para geração de subtarefas via IA.',
    example: 'Planejar uma viagem para o Japão',
  })
  @IsString()
  prompt: string;

  @ApiPropertyOptional({
    description:
      'Título da tarefa pai, se desejar gerar subtarefas para uma tarefa existente.',
    example: 'Reservar hotel',
  })
  @IsOptional()
  @IsString()
  parentTaskTitle?: string;
}
