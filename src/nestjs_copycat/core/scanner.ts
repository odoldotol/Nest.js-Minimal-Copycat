import { NestContainer } from "./injector";
import { MetadataScanner } from "./metadata-scanner";

export class DependenciesScanner {

  constructor(
    private readonly container: NestContainer,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  // public async scan(
  //   module: Type<any>,
  //   options?: { overrides?: ModuleOverride[] },
  // ) {
  //   await this.registerCoreModule(options?.overrides);
  //   await this.scanForModules({
  //     moduleDefinition: module,
  //     overrides: options?.overrides,
  //   });
  //   await this.scanModulesForDependencies();
  //   this.calculateModulesDistance();

  //   this.addScopedEnhancersMetadata();
  //   this.container.bindGlobalScope();
  // }

}