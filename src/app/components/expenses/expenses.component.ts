import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { PageOptionsDto } from '../../core/dto/page-options.dto';
import { Order } from '../../core/enums/order.enum';
import { SidenavService } from '../../core/services/sidenav.service';
import { AppState } from '../../core/state/interfaces/app.state';
import { PageHeaderComponent } from '../ui/page-header/page-header.component';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { ExpenseListItemComponent } from './expense-list-item/expense-list-item.component';
import { loadExpenses } from './state/actions/expenses-load.actions';
import { selectExpenses, selectExpensesMetaData } from './state/selectors/expenses.selectors';

const core = [
  CommonModule,
];

const internal = [
  PageHeaderComponent,
  ExpenseListItemComponent,
];

const material = [
  MatExpansionModule,
  MatButtonModule,
  MatPaginatorModule,
]

@Component({
  selector: 'app-expenses',
  standalone: true,
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  imports: [
    ...core,
    ...internal,
    ...material
  ],
})
export class ExpensesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  expenses$ = this.store.select(selectExpenses);
  expensesPageInfo$ = this.store.select(selectExpensesMetaData);

  constructor(
    private sidenavService: SidenavService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      loadExpenses({
        payload: {
          pageOptions: new PageOptionsDto(Order.DESC)
        }
      })
    );
  }

  handlePageEvent(event: PageEvent) {
    this.store.dispatch(
      loadExpenses({
        payload: {
          pageOptions: new PageOptionsDto(Order.DESC, event.pageIndex + 1, event.pageSize)
        }
      })
    );
  }

  openExpenseDrawer() {
    this.sidenavService.open({
      component: ExpenseCreateComponent,
      inputs: [],
    });
  }

  openAll() {
    this.accordion.openAll();
  }

  collapseAll() {
    this.accordion.closeAll();
  }
}
