import { Controller, Get, Post } from "src/nestjs-copycat/common";
import { Request, Response } from "express";
import { AppService } from "./app.service";
import { GreetingService } from "src/greeting/greeting.service";

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get("hello-world")
  helloWorld(req: Request, res: Response) {
    res.send(this.appService.helloWorld());
  }

  @Post()
  greeting(req: Request, res: Response) {
    res.send(this.appService.greeting(req.body));
  }

  @Get("goodbye")
  goodbye(req: Request, res: Response) {
    res.send(this.appService.goodbye());
  }

}
