import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, Input, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpenseUi } from '../../../models/expenses/ui/expense';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Confirmable } from '../../../core/decorators/confirmable.decorator';
import { ExpenseService } from '../../../services/expense.service';
import { SidenavService } from '../../../core/services/sidenav.service';
import { ExpenseEditComponent } from '../expense-edit/expense-edit.component';

@Component({
  selector: 'app-expense-list-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatExpansionModule],
  templateUrl: './expense-list-item.component.html',
  styleUrl: './expense-list-item.component.scss',
})
export class ExpenseListItemComponent {
  @Input() expense!: ExpenseUi;

  // TODO: define a mixin class for this injector and extend it where needed
  #environmentInjector = inject(EnvironmentInjector);
  #expenseService = inject(ExpenseService);
  #sidenavService = inject(SidenavService);

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
    this.#expenseService.removeExpense(this.expense.id).subscribe({
      next: () => this.#sidenavService.close(),
    });
  }

  getEnvironmentInjector() {
    return this.#environmentInjector;
  }
}
