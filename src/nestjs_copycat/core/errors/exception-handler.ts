import { RuntimeException } from './exceptions/runtime.exception';

export class ExceptionHandler {

  public handle(exception: RuntimeException | Error) {
    if (!(exception instanceof RuntimeException)) {
      // ExceptionHandler.logger.error(exception.message, exception.stack);
      console.log('ExceptionHandler.logger.error(exception.message, exception.stack);');
      return;
    }
    // ExceptionHandler.logger.error(exception.what(), exception.stack);
    console.log('ExceptionHandler.logger.error(exception.what(), exception.stack);');
  }
}