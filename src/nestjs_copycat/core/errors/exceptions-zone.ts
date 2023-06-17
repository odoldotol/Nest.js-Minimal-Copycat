import { ExceptionHandler } from './exception-handler';

const DEFAULT_TEARDOWN = () => process.exit(1);

export class ExceptionsZone {
  private static readonly exceptionHandler = new ExceptionHandler();

  public static run(
    callback: () => void,
    teardown: (err: any) => void = DEFAULT_TEARDOWN,
    autoFlushLogs?: boolean,
  ) {
    try {
      callback();
    } catch (e: any) {
      this.exceptionHandler.handle(e);
      if (autoFlushLogs) {
        // Logger.flush();
        console.log('Logger.flush()');
      }
      teardown(e);
    }
  }

  public static async asyncRun(
    callback: () => Promise<void>,
    teardown: (err: any) => void = DEFAULT_TEARDOWN,
    autoFlushLogs?: boolean,
  ) {
    try {
      await callback();
    } catch (e: any) {
      this.exceptionHandler.handle(e);
      if (autoFlushLogs) {
        // Logger.flush();
        console.log('Logger.flush()');
      }
      teardown(e);
    }
  }
}
