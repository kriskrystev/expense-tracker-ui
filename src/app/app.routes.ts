import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard()],
    loadChildren: () =>
      import('./components/main.module').then((m) => m.MainModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
