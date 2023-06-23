import express from 'express';
import { INestApplication } from "../common/interfaces";
import { NestContainer } from "./injector";
import { NestApplicationContext } from './nest-application-context';
import { Resolver, RoutesResolver } from './router';

export class NestApplication
   extends NestApplicationContext
  implements INestApplication
{
  private readonly routesResolver: Resolver;
  private isListening = false;
  private readonly expressApp = express();
  
  constructor(container: NestContainer) {
    super(container);

    this.routesResolver = new RoutesResolver(this.container);
  }

  public async init() {
    this.expressApp.use(express.json());

    // await this.registerModules();
    await this.registerRouter(); // this.resolveRoutes(container, expressApp);
    // await this.callInitHook();
    // await this.registerRouterHooks();
    // await this.callBootstrapHook();

    this.isInitialized = true;
    console.log(`Nest application successfully started`);
    return this;
  }

  public async registerRouter() {
    const basePath = '/'
    this.routesResolver.resolve(this.expressApp, basePath);
  }

  /**
   * @override Express.use
   */
  public use(...args: any[]): this {
    this.expressApp.use(...args);
    return this;
  }

  public async listen(port: number | string, callback?: () => void): Promise<any> {

    !this.isInitialized && (await this.init());
    
    !this.isListening && this.expressApp.listen(port, () => {
      callback && callback();
      this.isListening = true;
    });

    return this;
  }

}