const express = require('express');
import { Express } from "express";
import { NestContainer } from './injector';
import { Type } from "../common/interfaces";
import { PATH_METADATA, METHOD_METADATA } from "../common/constants";
import { RequestMethod } from '../common';
import { pathParser } from "../common";

export class NestFactoryStatic {

  public async create(
    moduleCls: Type<any>,
  ): Promise<Express> {
    
    const container = new NestContainer();
    
    await this.initialize(moduleCls, container);
    
    const app = express();
    app.use(express.json());
    
    this.resolveRoutes(container, app);

    return app;

  }

  private async initialize(module: any, container: NestContainer) {
    await container.moduleInit(module, container);
  };

  private resolveRoutes(container: NestContainer, app: Express) {
    container.getControllers().forEach((instance) => {
      const router = express.Router();
      const routeLogs: string[] = [];
      const controllerPath = pathParser(Reflect.getMetadata(PATH_METADATA, instance.constructor));
      console.log(`${instance.constructor.name} {${controllerPath}}`);
      const prototype = Object.getPrototypeOf(instance);
      Object.getOwnPropertyNames(prototype).forEach((propName) => {
        if (propName === "constructor") return;
        const method = Reflect.getMetadata(METHOD_METADATA, prototype[propName]);
        const methodPath = pathParser(Reflect.getMetadata(PATH_METADATA, prototype[propName]));
        router[RequestMethod[method].toLowerCase()](methodPath, prototype[propName].bind(instance));
        routeLogs.push(`Mapped {${pathParser(controllerPath + methodPath)}, ${RequestMethod[method]}} route`);
      });
      app.use(controllerPath, router);
      routeLogs.forEach((log) => console.log(log));
    });
  }

}

export const NestFactory = new NestFactoryStatic();