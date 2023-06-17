import { Injectable } from 'src/nestjs-copycat/common';
import { GreetingService } from 'src/greeting/greeting.service';

@Injectable()
export class AppService {

  constructor(
    private readonly greetingService: GreetingService,
  ) {}

  helloWorld() {
    return 'Hello World!';
  }

  greeting = this.greetingService.greeting;

}
