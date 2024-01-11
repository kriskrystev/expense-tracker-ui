import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../ui/page-header/page-header.component';
import { AppService } from '../../services/app.service';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { ExpenseService } from '../../services/expense-service.service';
import { PageOptionsDto } from '../../core/dto/page-options.dto';
import { Order } from '../../core/enums/order.enum';
import { take } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-expenses',
  standalone: true,
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  imports: [PageHeaderComponent, MatPaginatorModule],
})
export class ExpensesComponent implements OnInit {
  expenses = this.expensesService.expenses;
  expensesPageInfo = this.expensesService.expensesPageInfo;

  constructor(
    private appService: AppService,
    private expensesService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.expensesService
      .getAllExpenses(new PageOptionsDto(Order.DESC))
      .pipe(take(1))
      .subscribe();
  }

  openExpenseDrawer() {
    this.appService.sideNavContent.next({
      content: {
        component: ExpenseCreateComponent,
        inputs: [],
      },
      open: true,
    });
  }

  handlePageEvent(event: PageEvent) {
    console.log(event);
  }
}
