import { Controller, Post } from "src/nestjs-copycat/common";
import { GreetingService } from "./greeting.service";

@Controller("greeting")
export class GreetingController {

  constructor(private readonly greetingService: GreetingService) {}

  @Post()
  greeting(/*@Body()*/ body: { name: string }) {
    return this.greetingService.greeting(body);
  }

}
