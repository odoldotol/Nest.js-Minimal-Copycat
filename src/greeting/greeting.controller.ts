import { Controller, Post } from "src/nestjs-copycat/common";
import { Request, Response } from "express";
import { GreetingService } from "./greeting.service";

@Controller("greeting")
export class GreetingController {

  constructor(private readonly greetingService: GreetingService) {}

  @Post()
  greeting(req: Request, res: Response) {
    res.send(this.greetingService.greeting(req.body));
  }

}
