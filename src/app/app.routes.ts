import { Routes } from '@angular/router';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TopExpenses } from './components/top-expenses/top-expenses.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'top-expenses',
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
