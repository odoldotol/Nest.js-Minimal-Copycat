import { Express, Router as expressRouter } from "express";
import { NestContainer } from "../injector";
import { Resolver } from "./interfaces";
import { RequestMethod, pathParser } from "src/nestjs-copycat/common";
import { METHOD_METADATA, PATH_METADATA } from "src/nestjs-copycat/common/constants";

export class RoutesResolver implements Resolver {

  constructor(
    private readonly container: NestContainer
  ) {}

  public resolve(
    applicationRef: Express,
    globalPrefix: string,
  ) {
    this.container.getControllers().forEach((controllerInst) => {
      const router = expressRouter();
      const routeLogs: string[] = [];
      const controllerPath = pathParser(Reflect.getMetadata(PATH_METADATA, controllerInst.constructor));
      console.log(`${controllerInst.constructor.name} {${controllerPath}}`);
      const prototype = Object.getPrototypeOf(controllerInst);
      Object.getOwnPropertyNames(prototype).forEach((propName) => {
        if (propName === "constructor") return;
        const method = Reflect.getMetadata(METHOD_METADATA, prototype[propName]);
        const methodPath = pathParser(Reflect.getMetadata(PATH_METADATA, prototype[propName]));
        router[RequestMethod[method].toLowerCase() as Method](methodPath, prototype[propName].bind(controllerInst));
        routeLogs.push(`Mapped {${pathParser(controllerPath + methodPath)}, ${RequestMethod[method]}} route`);
      });
      applicationRef.use(controllerPath, router);
      routeLogs.forEach((log) => console.log(log));
    });
  }

}

type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';