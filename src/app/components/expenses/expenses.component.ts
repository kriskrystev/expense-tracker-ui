import { Component } from '@angular/core';
import { PageHeaderComponent } from '../ui/page-header/page-header.component';
import { AppService } from '../../services/app.service';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  constructor(private appService: AppService) {}

  openExpenseDrawer() {
    this.appService.sideNavContent.next({
      content: {
        component: ExpenseCreateComponent,
        inputs: [],
      },
      open: true,
    });
  }
}
