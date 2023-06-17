import { Injectable } from 'src/nestjs-copycat/common';

@Injectable()
export class AppService {

  constructor() {}

  helloWorld() {
    return 'Hello World!';
  }

}
