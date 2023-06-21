import { Injectable } from 'src/nestjs-copycat/common';
import { GreetingService } from 'src/greeting/greeting.service';
import { GoodbyeService } from 'src/goodbye/goodbye.service';

@Injectable()
export class AppService {

  constructor(
    private readonly greetingService: GreetingService,
    private readonly goodbyeService: GoodbyeService,
  ) {}

  helloWorld() {
    return 'Hello World!';
  }

  greeting = this.greetingService.greeting;

  goodbye = this.goodbyeService.goodbye;

}
