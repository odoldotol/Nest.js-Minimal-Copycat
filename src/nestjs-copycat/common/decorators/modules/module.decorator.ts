import { ModuleMetadata } from "../../interfaces";

export function Module(metadata: ModuleMetadata): ClassDecorator {
//   const propsKeys = Object.keys(metadata);
//   validateModuleKeys(propsKeys);

  return (target: Function) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, (metadata as any)[property], target);
      }
    }
  };
}
