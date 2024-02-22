import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { GlobalErrorHandler } from './core/error-handling/global-error-handler';
import { HttpLoadingInterceptor } from './core/error-handling/http-loading.interceptor';
import { HttpErrorInterceptor } from './core/error-handling/http-error.interceptor';
import { authInterceptor } from './core/auth/auth.interceptor';

/**
 * Overrides the default toJSON implemenation, which is using the toISOString() method.
 * Angular does this under the hood for all properties when serializing each json payload.
 * Since we want to send the local date time we need to call the toString() method instead.
 *
 * P.S could be worth exploring a solution where we have our own Date object class.
 * Then we can extend it and not apply this type of change for all Date objects.
 * For the timebeing this will do tho...
 */
Date.prototype.toJSON = function () {
  return this.toUTCString();
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        HttpErrorInterceptor,
        HttpLoadingInterceptor,
      ])
    ),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    provideAnimations(),
  ],
};
