import { Routes } from '@angular/router';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TopExpenses } from './components/top-expenses/top-expenses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'top-expenses',
    component: TopExpenses,
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
];
