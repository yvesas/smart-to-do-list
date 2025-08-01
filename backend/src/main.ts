import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(cors());

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Smart To-Do List API')
    .setDescription('API para gerenciamento de tarefas com geração via IA')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);
  console.log(`Swagger disponível em http://localhost:${port}/api`);
}
bootstrap();
