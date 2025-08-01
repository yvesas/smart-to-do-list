import { IsString, IsOptional } from "class-validator";

export class GenerateTasksDto {
  @IsString()
  prompt: string;

  @IsOptional()
  @IsString()
  parentTaskTitle?: string;
}
