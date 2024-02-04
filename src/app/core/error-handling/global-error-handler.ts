import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ErrorDialogService } from './error-dialog.service';

// TODO: rethink this and maybe make it so that it only appearch for dev and local env...
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private errorDialogService: ErrorDialogService,
    private zone: NgZone
  ) {}

  handleError(error: any): void {
    this.zone.run(() => {
      this.errorDialogService.openDialog(error.message);
    });
  }
}
