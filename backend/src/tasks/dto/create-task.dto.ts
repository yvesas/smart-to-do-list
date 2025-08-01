import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Comprar passagens aéreas',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada da tarefa',
    example: 'Pesquisar voos e reservar para as datas desejadas',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'ID da tarefa pai (para subtarefas)',
    example: 'abc123',
  })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiPropertyOptional({
    description: 'Indica se a tarefa foi gerada por IA',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isAiGenerated?: boolean;
}
