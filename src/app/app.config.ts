import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

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
  return this.toString();
};

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes), provideAnimations()],
};
