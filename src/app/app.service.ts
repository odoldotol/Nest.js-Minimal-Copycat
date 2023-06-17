import { Injectable } from 'src/nestjs_copycat/common';

@Injectable()
export class AppService {

  constructor() {}

  helloWorld() {
    return 'Hello World!';
  }

}
