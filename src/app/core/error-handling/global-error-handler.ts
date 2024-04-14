import { ErrorHandler, Injectable } from '@angular/core';

// TODO: rethink this and maybe make it so that it only appearch for dev and local env...
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
  ) {}

  handleError(error: any): void {
    console.log(error);
    // this.zone.run(() => {
    //   this.errorDialogService.openDialog(error.message);
    // });
  }
}
