import { Injectable } from "src/nestjs-copycat/common";

@Injectable()
export class GoodbyeService {

  constructor() {}

  public goodbye() {
    return "Goodbye!";
  }

}