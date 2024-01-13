import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, Input, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpenseUi } from '../../../models/expenses/ui/expense';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Confirmable } from '../../../core/decorators/confirmable.decorator';

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
  onEdit() {}

  @Confirmable({
    title: 'Delete expense',
    textPrompt: 'Are you sure you wish to delete this expense?',
  })
  onDelete() {}

  getEnvironmentInjector() {
    return this.#environmentInjector;
  }
}
