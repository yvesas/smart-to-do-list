import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksModule } from "./tasks/tasks.module";
import { AIModule } from "./ai/ai.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TasksModule, AIModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
