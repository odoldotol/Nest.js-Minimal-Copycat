import { CONTROLLER_WATERMARK } from "src/nestjs-copycat/common/constants";

export class NestContainer {

  private readonly modules = new Map<string, any>(); // Class ModulesContainer // ./injector/modules-container.ts

  private readonly instances = new Map<string, any>();

  public addInstance(key: string, instance: any) {
    if (this.instances.has(instance.constructor.name))
      throw new Error(`Duplicated provider name: ${instance.constructor.name}`);
    this.instances.set(key, instance);
  }

  public getInstance(name: string) {
    const instance = this.instances.get(name);
    if (!instance)
      throw new Error(`Provider not found: ${name}`);
    return instance;
  }

  get instancesContainer() { // 임시
    return this.instances;
  }

  get modulesContainer() { // 임시
    return this.modules;
  }

  public getControllers() {
    return [...this.instances.values()].filter(instance => {
      return Reflect.getMetadata(CONTROLLER_WATERMARK, instance.constructor);
    });
  }

}