import { Routes } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ExpensesComponent } from "./components/expenses/expenses.component";
import { CategoriesComponent } from "./components/categories/categories.component";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard"
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "expenses",
    component: ExpensesComponent
  },
  {
    path: "categories",
    component: CategoriesComponent
  }
];
