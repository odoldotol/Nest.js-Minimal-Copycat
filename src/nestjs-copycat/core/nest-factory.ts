const express = require('express')
import { Express } from "express";
import { NestContainer } from './injector';
import { Type } from "../common/interfaces";
import { MODULE_METADATA, PATH_METADATA, METHOD_METADATA } from "../common/constants";
import { RequestMethod } from '../common';


export class NestFactoryStatic {

  public async create(
    moduleCls: Type<any>,
  ): Promise<Express> {
    
    const container = new NestContainer();
    const app = express();

    app.use(express.json());

    await this.moduleInit(moduleCls, container, app);

    return app;

  }

  private async moduleInit(module: Type<any>, container: NestContainer, app: Express) {
    
    await Promise.all(Reflect.getMetadata(MODULE_METADATA.IMPORTS, module).map(
      async (importedModule: Type<any>) => {
        await this.moduleInit(importedModule, container, app);
      }
    ));

    await Promise.all(Reflect.getMetadata(MODULE_METADATA.PROVIDERS, module).map(
      async (provider: Type<any>) => {
      // Todo: 인젝터블 확인
      // Todo: addInstance 하기전에 getDependencies 해서 가져온 의존성들이 본인의 프로바이더 또는 하위 모듈에서 내보내진 프로바이더인지 확인해야함.
      const instance = new provider(...container.getDependencies(provider));
      // Todo: 이때 onModuleInit 메서드 가졌으면 실행해주기?
      container.addInstance(provider.name, instance);
      }
    ));

    await Promise.all(Reflect.getMetadata(MODULE_METADATA.CONTROLLERS, module).map(
      async (controller: Type<any>) => {
      // Todo: 컨트롤러 확인
      const instance = new controller(...container.getDependencies(controller));
      container.addInstance(controller.name, instance);
      
      // 라우터 만들어서 app에 등록
      const router = express.Router();
      let controllerPath = Reflect.getMetadata(PATH_METADATA, controller);
      const prototype = Object.getPrototypeOf(instance);
      const descriptors = Object.getOwnPropertyDescriptors(prototype);
      Object.keys(descriptors).forEach((key) => {
        if (key === "constructor") return;
        const method = Reflect.getMetadata(METHOD_METADATA, prototype[key]);
        let methodPath = Reflect.getMetadata(PATH_METADATA, prototype[key]);
        methodPath = methodPath.replace(/^\/?/, "/");
        router[RequestMethod[method].toLowerCase()](methodPath, prototype[key].bind(instance));
      });
      controllerPath = controllerPath.replace(/^\/?/, "/");
      app.use(controllerPath, router);
      }
    ));

    console.log(module.name, "Init");
  
  }

}

export const NestFactory = new NestFactoryStatic();