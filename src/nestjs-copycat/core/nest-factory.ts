const express = require('express')
import { Express } from "express";
import { NestContainer } from './injector';
import { Type } from "../common/interfaces";

export class NestFactoryStatic {

  public async create(
    moduleCls: Type<any>,
  ) {
    
    const container = new NestContainer();
    const app = express();

    await this.moduleInit(moduleCls, container, app);

    // console.log(container.instancesMap);



    app.use(express.json());
    return app;

  }

  private async moduleInit(module: Type<any>, container: NestContainer, app: Express) {
    
    Reflect.getMetadata('imports', module)
    .forEach((importedModule: Type<any>) => {
      this.moduleInit(importedModule, container, app);
    });

    Reflect.getMetadata('providers', module)
    .forEach((provider: Type<any>) => {
      // Todo: 인젝터블 확인
      // Todo: addInstance 하기전에 getDependencies 해서 가져온 의존성들이 본인의 프로바이더 또는 하위 모듈에서 내보내진 프로바이더인지 확인해야함.
      const instance = new provider(...container.getDependencies(provider));
      // Todo: 이때 onModuleInit 메서드 가졌으면 실행해주기?
      container.addInstance(provider.name, instance);
    });

    Reflect.getMetadata('controllers', module)
    .forEach((controller: Type<any>) => {
      // Todo: 컨트롤러 확인
      const instance = new controller(...container.getDependencies(controller));
      container.addInstance(controller.name, instance);
      
      // 라우터 만들어서 app에 등록
      const router = express.Router();
      const path = Reflect.getMetadata('path', controller);
      console.log(path);
      const prototype = Object.getPrototypeOf(instance);
      const propertyNames = Object.getOwnPropertyNames(prototype);
      propertyNames.splice(propertyNames.indexOf('constructor'), 1);
      console.log(propertyNames);
    });
  
  }



}

export const NestFactory = new NestFactoryStatic();