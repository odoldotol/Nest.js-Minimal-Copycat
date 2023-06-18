import { Type } from "src/nestjs-copycat/common/interfaces";

export class NestContainer {

  private readonly instances = new Map<string, any>();

  public addInstance(key: string, instance: any) {
    if (this.instances.has(instance.name))
      throw new Error(`Duplicated provider name: ${instance.name}`);
    this.instances.set(key, instance);
  }

  public getInstance(name: string) {
    const instance = this.instances.get(name);
    if (!instance)
      throw new Error(`Provider not found: ${name}`);
    return instance;
  }

  public getDependencies(cls: Type<any>) {
    return Reflect.getMetadata('design:paramtypes', cls)?.map(
      (dep: Type<any>) => this.getInstance(dep.name)
    ) || [];
  }

  get instancesMap() { // 임시
    return this.instances;
  }

}