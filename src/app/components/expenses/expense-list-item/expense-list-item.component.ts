import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ExpenseUi } from '../../../models/expenses/ui/expense';

@Component({
  selector: 'app-expense-list-item',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatPaginatorModule],
  templateUrl: './expense-list-item.component.html',
  styleUrl: './expense-list-item.component.scss',
})
export class ExpenseListItemComponent {
  @Input() expense!: ExpenseUi;
}