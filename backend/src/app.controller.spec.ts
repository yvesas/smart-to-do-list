import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("hello", () => {
    it('should return "Hello, welcome to the Smart To-Do List API!"', () => {
      expect(appController.getHello()).toBe(
        "Hello, welcome to the Smart To-Do List API!"
      );
    });
  });
});
