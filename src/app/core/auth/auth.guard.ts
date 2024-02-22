import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export function authGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);

    if (authService.hasAccessToken()) {
      return true;
    }

    authService.initLogin();
    return false;
  };
}
