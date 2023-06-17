import { Controller, Get } from "src/nestjs_copycat/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  helloWorld() {
    return this.appService.helloWorld();
  }

}
