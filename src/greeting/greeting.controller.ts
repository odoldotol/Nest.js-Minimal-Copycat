// import { Controller, Post } from "src/nestjs_copycat/common";
import { Body, Controller, Post } from "src/nestjs/packages/common";
import { GreetingService } from "./greeting.service";

@Controller("greeting")
export class GreetingController {

  constructor(private readonly greetingService: GreetingService) {}

  @Post()
  greeting(@Body() body: { name: string }) {
    return this.greetingService.greeting(body);
  }

}
