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

    
    await this.moduleInit(moduleCls, container);
    
    app.use(express.json());
    
    this.resolveRoutes(container, app);

    return app;

  }

  private async moduleInit(module: Type<any>, container: NestContainer) {
    
    await Promise.all(Reflect.getMetadata(MODULE_METADATA.IMPORTS, module).map(
      async (importedModule: Type<any>) => {
        await this.moduleInit(importedModule, container);
      }
    ));

    await Promise.all(Reflect.getMetadata(MODULE_METADATA.PROVIDERS, module).map(
      async (provider: Type<any>) => {
        // Todo: 인젝터블 확인
        // Todo: getDependencies 해서 가져온 의존성들이 본인의 프로바이더 또는 하위 모듈에서 내보내진 프로바이더인지 확인해야함.
        const instance = new provider(...container.getDependencies(provider));
        // Todo: 이때 onModuleInit 메서드 가졌으면 실행해주기?
        container.addInstance(provider.name, instance);
      }
    ));

    await Promise.all(Reflect.getMetadata(MODULE_METADATA.CONTROLLERS, module).map(
      async (controller: Type<any>) => {
        // Todo: 컨트롤러 확인
        // Todo: getDependencies 해서 가져온 의존성들이 본인의 프로바이더 또는 하위 모듈에서 내보내진 프로바이더인지 확인해야함.
        const instance = new controller(...container.getDependencies(controller));
        container.addInstance(controller.name, instance);
      }
    ));

    console.log(module.name, "Init");
  
  }

  private resolveRoutes(container: NestContainer, app: Express) {
    container.getControllers().forEach((instance) => {
      const router = express.Router();
      const routeLogs: string[] = [];
      let controllerPath = Reflect.getMetadata(PATH_METADATA, instance.constructor);
      controllerPath = controllerPath.replace(/^\/?/, "/");
      console.log(`${instance.constructor.name} {${controllerPath}}`);
      const prototype = Object.getPrototypeOf(instance);
      Object.getOwnPropertyNames(prototype).forEach((propName) => {
        if (propName === "constructor") return;
        const method = Reflect.getMetadata(METHOD_METADATA, prototype[propName]);
        let methodPath = Reflect.getMetadata(PATH_METADATA, prototype[propName]);
        methodPath = methodPath.replace(/^\/?/, "/");
        router[RequestMethod[method].toLowerCase()](methodPath, prototype[propName].bind(instance));
        let logPath = controllerPath+methodPath;
        logPath = logPath.replace(/\/{2,}/g, "/");
        logPath = logPath.replace(/([^\/])\/$/, "$1");
        routeLogs.push(`Mapped {${logPath}, ${RequestMethod[method]}} route`);
      });
      app.use(controllerPath, router);
      routeLogs.forEach((log) => console.log(log));
    });
  }

}

export const NestFactory = new NestFactoryStatic();