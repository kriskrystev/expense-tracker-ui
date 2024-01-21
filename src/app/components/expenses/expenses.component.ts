import { Component, OnInit, ViewChild } from '@angular/core';
import { PageHeaderComponent } from '../ui/page-header/page-header.component';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { ExpenseService } from '../../services/expense.service';
import { PageOptionsDto } from '../../core/dto/page-options.dto';
import { Order } from '../../core/enums/order.enum';
import { take } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ExpenseListItemComponent } from './expense-list-item/expense-list-item.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { SidenavService } from '../../core/services/sidenav.service';
@Component({
  selector: 'app-expenses',
  standalone: true,
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  imports: [
    CommonModule,
    PageHeaderComponent,
    MatExpansionModule,
    MatButtonModule,
    ExpenseListItemComponent,
    MatPaginatorModule,
  ],
})
export class ExpensesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  expenses = this.expensesService.expenses;
  expensesPageInfo = this.expensesService.expensesPageInfo;

  constructor(
    private expensesService: ExpenseService,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.expensesService
      .getAllExpenses(new PageOptionsDto(Order.DESC))
      .pipe(take(1))
      .subscribe();
  }

  openExpenseDrawer() {
    this.sidenavService.open({
      component: ExpenseCreateComponent,
      inputs: [],
    });
  }

  handlePageEvent(event: PageEvent) {
    this.expensesService
      .getAllExpenses(
        new PageOptionsDto(Order.DESC, event.pageIndex + 1, event.pageSize)
      )
      .subscribe();
  }

  openAll() {
    this.accordion.openAll();
  }

  collapseAll() {
    this.accordion.closeAll();
  }
}
