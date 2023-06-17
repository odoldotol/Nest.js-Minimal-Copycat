import { Controller } from "src/nestjs-copycat/common";
import { AppService } from "./app.service";
import { GreetingService } from "src/greeting/greeting.service";

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  // @Get()
  helloWorld() {
    return this.appService.helloWorld();
  }

  // @Post()
  greeting(body: { name: string }) {
    return this.appService.greeting(body);
  }

}
