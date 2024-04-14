import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Confirmable } from '../../../core/decorators/confirmable.decorator';
import { SidenavService } from '../../../core/services/sidenav.service';
import { AppState } from '../../../core/state/interfaces/app.state';
import { ExpenseUi } from '../../../models/expenses/ui/expense';
import { ExpenseEditComponent } from '../expense-edit/expense-edit.component';
import { deleteExpense } from '../state/actions/expenses-delete.actions';

const core = [
  CommonModule
];

const material = [
  MatButtonModule,
  MatIconModule,
  MatExpansionModule
]

@Component({
  selector: 'app-expense-list-item',
  standalone: true,
  imports: [...core, ...material],
  templateUrl: './expense-list-item.component.html',
  styleUrl: './expense-list-item.component.scss',
})
export class ExpenseListItemComponent {
  @Input() expense!: ExpenseUi;

  // TODO: define a mixin class for this injector and extend it where needed
  #environmentInjector = inject(EnvironmentInjector);
  #sidenavService = inject(SidenavService);

  constructor(private store: Store<AppState>) { }

  onEdit() {
    this.#sidenavService.open({
      component: ExpenseEditComponent,
      inputs: {
        data: this.expense,
      },
    });
  }

  @Confirmable({
    title: 'Delete expense',
    textPrompt: 'Are you sure you wish to delete this expense?',
  })
  onDelete() {
    this.store.dispatch(
      deleteExpense({
        payload: {
          expenseId: this.expense.id
        }
      })
    );
  }

  getEnvironmentInjector() {
    return this.#environmentInjector;
  }
}
