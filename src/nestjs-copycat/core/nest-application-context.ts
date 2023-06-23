import { INestApplicationContext } from "../common/interfaces";
import { NestContainer } from "./injector";

/**
 * @publicApi
 */
export class NestApplicationContext
  implements INestApplicationContext
{
  protected isInitialized = false;

  constructor(
    protected readonly container: NestContainer,
  ) {}

  /**
   * Initializes the Nest application.
   * Calls the Nest lifecycle events.
   *
   * @returns {Promise<this>} The NestApplicationContext instance as Promise
   */
  public async init(): Promise<this> {
    if (this.isInitialized) {
      return this;
    }
    // await this.callInitHook();
    // await this.callBootstrapHook();

    this.isInitialized = true;
    return this;
  }

}