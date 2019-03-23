import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.log('An error occured: ', error.message || error);
  }
}
