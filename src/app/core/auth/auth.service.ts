import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn$ = new BehaviorSubject(false);

  constructor(private router: Router) {
    if (this.hasAccessToken()) {
      this.loggedIn$.next(true);
    }
  }

  hasAccessToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  setAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.loggedIn$.next(true);
  }

  initLogin() {
    this.router.navigate(['/login']);
  }
}
