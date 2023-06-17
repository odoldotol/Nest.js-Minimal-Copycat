import { Injectable } from 'src/nestjs-copycat/common';

@Injectable()
export class GreetingService {

  constructor() {}

  greeting(body: { name: string }) {
    if (body.name?.trim().length > 0) {
      return `Hello ${body.name}!`;
    } else {
      return {
        "message": "Invalid name",
        "error": "Bad Request",
        "statusCode": 400
      };
    }
  }

}
