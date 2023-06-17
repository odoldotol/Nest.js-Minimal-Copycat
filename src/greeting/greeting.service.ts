// import { Injectable } from 'src/nestjs_copycat/common';
import { BadRequestException, Injectable } from 'src/nestjs/packages/common';

@Injectable()
export class GreetingService {

  constructor() {}

  greeting(body: { name: string }) {
    if (body.name?.trim().length > 0) {
      return `Hello ${body.name}!`;
    } else {
      throw new BadRequestException('Invalid name');
    }
  }

}
