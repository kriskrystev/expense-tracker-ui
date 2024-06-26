import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { StoreModule, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { ExpensesEffects } from './components/expenses/state/effects/expenses.effects';
import { expensesReducer } from './components/expenses/state/reducers/expenses.reducer';
import { authInterceptor } from './core/auth/auth.interceptor';
import { GlobalErrorHandler } from './core/error-handling/global-error-handler';
import { HttpErrorInterceptor } from './core/error-handling/http-error.interceptor';
import { HttpLoadingInterceptor } from './core/error-handling/http-loading.interceptor';
import { AuthEffects } from './core/state/auth/effects/auth.effects';
import { authReducer } from './core/state/auth/reducers/auth.reducer';

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
    provideStore(),
    provideEffects(AuthEffects, ExpensesEffects),
    importProvidersFrom(
      HttpClientModule,
      StoreModule.forRoot({
        auth: authReducer,
        expenses: expensesReducer
      }),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        // logOnly: environment.production, // Restrict extension to log-only mode
      }),
    ),
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
