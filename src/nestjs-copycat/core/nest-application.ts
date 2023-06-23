const express = require('express');
import { Express } from 'express';

import { INestApplication, INestApplicationContext } from "../common/interfaces";
import { NestContainer } from "./injector";
import { RequestMethod } from '../common';
import { pathParser } from "../common";
import { METHOD_METADATA, PATH_METADATA } from '../common/constants';
import { NestApplicationContext } from './nest-application-context';

export class NestApplication
   extends NestApplicationContext
  implements INestApplication
{
  // private readonly routesResolver: Resolver;
  private isListening = false;
  
  constructor(container: NestContainer) {
    super(container);

    const expressApp = express();
    expressApp.use(express.json());

    // this.routesResolver = new RoutesResolver(this.container);
  }

  public async init() {
    return this;
  }

  public use(...args: any[]): this {
    return this;
  }

  public async listen(port: number | string, callback?: () => void): Promise<any> {
    const resolveRoutes = (container: NestContainer, app: Express) => {
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
    // this.resolveRoutes(container, expressApp);
    return this;
  }

}