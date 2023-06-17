const express = require('express')
import { Express } from "express";
import { NestContainer } from './injector'

class NestFactoryStatic {

  public async create(
    moduleCls: any,
  ): Promise<Express> {
    const app = express();
    app.use(express.json());
    return app;

    // const container = new NestContainer();

    // await this.initialize(
    //   moduleCls,
    //   container,
    // );

    // const instance = new NestApplication(container);
    // const target = this.createNestInstance(instance);
    // return this.createAdapterProxy<T>(target, httpServer);
  }

  // private async initialize(
  //   module: any,
  //   container: NestContainer,
  // ) {

  //   const injector = new Injector({ preview: options.preview });
  //   const instanceLoader = new InstanceLoader(
  //     container,
  //     injector,
  //     graphInspector,
  //   );
  //   const metadataScanner = new MetadataScanner();
  //   const dependenciesScanner = new DependenciesScanner(
  //     container,
  //     metadataScanner,
  //     graphInspector,
  //     config,
  //   );
  //   container.setHttpAdapter(httpServer);

  //   const teardown = this.abortOnError === false ? rethrow : undefined;
  //   await httpServer?.init();
  //   try {
  //     this.logger.log(MESSAGES.APPLICATION_START);

  //     await ExceptionsZone.asyncRun(
  //       async () => {
  //         await dependenciesScanner.scan(module);
  //         await instanceLoader.createInstancesOfDependencies();
  //         dependenciesScanner.applyApplicationProviders();
  //       },
  //       teardown,
  //       this.autoFlushLogs,
  //     );
  //   } catch (e) {
  //     this.handleInitializationError(e);
  //   }
  // }

}

export const NestFactory = new NestFactoryStatic();