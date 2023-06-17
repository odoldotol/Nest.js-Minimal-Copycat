import { NestContainer } from "./container";
import { Injector } from "./injector";

export class InstanceLoader<TInjector extends Injector = Injector> {

  constructor(
    private readonly container: NestContainer,
    private readonly injector: TInjector,
  ) {}

}