// import { Injectable } from 'src/nestjs_copycat/common';
import { Injectable } from 'src/nestjs/packages/common';

@Injectable()
export class AppService {

  constructor() {}

  helloWorld() {
    return 'Hello World!';
  }

}
