import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AIModule } from './ai/ai.module';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TasksModule, AIModule],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {}
