import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn$ = new BehaviorSubject(false);
  url = 'http://localhost/api';

  constructor(private router: Router, private http: HttpClient) {
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

  login(username: string, password: string) {
    return this.http
      .post<{ access_token: string }>('http://localhost/api/auth/login', {
        username,
        password,
      })
      .pipe(
        tap((payload: { access_token: string }) => {
          this.setAccessToken(payload.access_token);
          this.router.navigate(['/dashboard']);
        })
      );
  }
}
