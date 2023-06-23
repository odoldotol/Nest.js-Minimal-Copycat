import { NestContainer } from './injector';
import { INestApplication, Type } from "../common/interfaces";
import { MODULE_METADATA } from "../common/constants";
import { NestApplication } from "./nest-application";

export class NestFactoryStatic {

  public async create(
    moduleCls: any,
  ): Promise<INestApplication> {
    
    const container = new NestContainer();
    
    await this.initialize(moduleCls, container);
    
    const instance = new NestApplication(container);

    return instance;
  }

  /**
   * @todo Injector, InstanceLoader, MetadataScanner, DependenciesScanner
   */
  private async initialize(module: any, container: NestContainer) {
    await this.moduleInit(module, container);
  };

  // Todo: imports, providers, controllers 가 undefined 인 경우라도 문제없이 초기화 해야함.
  // Todo: 내부함수로 나누기, 일부 내부함수를 컨테이너로 옮기기
  public async moduleInit(module: Type<any>, container: NestContainer) {

    container.modulesContainer.set(module.name, module); // 임시

    await Promise.all(Reflect.getMetadata(MODULE_METADATA.IMPORTS, module).map(
      async (importedModule: Type<any>) => {
        // Todo: 이미 한번 쳐다본 모듈은 다시 보지 말아야함 // <- 컨테이너가 모듈을 다루도록 하는것이 선행되어야함.
        container.modulesContainer.has(importedModule.name) || // 임시
        await this.moduleInit(importedModule, container);
      }
    ));

    await Promise.all(Reflect.getMetadata(MODULE_METADATA.PROVIDERS, module).map(
      async (provider: Type<any>) => {
        // Todo: 인젝터블 확인
        // Todo: getDependencies 해서 가져온 의존성들이 본인의 프로바이더 또는 imported module 의 exported provider 인지 확인해야함.
        const instance = new provider(...this.getDependencies(provider, container));
        // Todo: 이때 onModuleInit 메서드 가졌으면 실행해주기?
        container.addInstance(provider.name, instance);
      }
    ));

    await Promise.all(Reflect.getMetadata(MODULE_METADATA.CONTROLLERS, module).map(
      async (controller: Type<any>) => {
        // Todo: 컨트롤러 확인
        // Todo: getDependencies 해서 가져온 의존성들이 본인의 프로바이더 또는 하위 모듈에서 내보내진 프로바이더인지 확인해야함.
        const instance = new controller(...this.getDependencies(controller, container));
        container.addInstance(controller.name, instance);
      }
    ));

    console.log(module.name, "Init");
  
  }

  // Todo: core/scanner.ts - DependenciesScanner 로 이동하기
  private getDependencies(cls: Type<any>, container: NestContainer) {
    return Reflect.getMetadata('design:paramtypes', cls)?.map(
      (dep: Type<any>) => container.getInstance(dep.name)
    ) || [];
  }

}

export const NestFactory = new NestFactoryStatic();