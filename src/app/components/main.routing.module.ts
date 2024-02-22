import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { TopExpenses } from './top-expenses/top-expenses.component';

const routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
