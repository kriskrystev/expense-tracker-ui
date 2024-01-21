import { Component, Inject, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ERROR_STATE_MATCHER_TOKEN } from '../../../core/utils/error-state-matcher';
import { CategoryService } from '../../../services/category.service';
import { ExpenseService } from '../../../services/expense.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageOptionsDto } from '../../../core/dto/page-options.dto';
import { Order } from '../../../core/enums/order.enum';
import { ValidateForm } from '../../../core/decorators/validate-form.decorator';
import { FormFieldErrorMessageComponent } from '../../ui/form-field-error-message/form-field-error-message.component';
import { CloseDrawerDirective } from '../../../core/directives/close-drawer.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseUi } from '../../../models/expenses/ui/expense';
import { take } from 'rxjs';

const core = [NgIf, FormsModule, ReactiveFormsModule];

const material = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatNativeDateModule,
  MatDatepickerModule,
];

const internal = [FormFieldErrorMessageComponent, CloseDrawerDirective];
@Component({
  selector: 'app-expense-edit',
  standalone: true,
  imports: [...core, ...material, ...internal],
  templateUrl: './expense-edit.component.html',
  styleUrl: './expense-edit.component.scss',
})
export class ExpenseEditComponent {
  @Input() data!: ExpenseUi;

  form!: FormGroup;
  matcher = inject(ERROR_STATE_MATCHER_TOKEN);

  categories = this.categoryService.categories;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: [this.data.description],
      amount: [this.data.amount, [Validators.required, Validators.min(0)]],
      categoryId: [this.data.categoryId, Validators.required],
      date: [new Date(this.data.date), Validators.required],
    });

    this.categoryService
      .getCategoriesPage(
        new PageOptionsDto(Order.DESC, 1, Number.MAX_SAFE_INTEGER)
      )
      .subscribe();
  }

  @ValidateForm()
  confirm(): void {
    this.expenseService
      .updateExpense({
        id: this.data.id,
        ...this.form.value,
      })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackbar.open('Expense record updated!', 'ok', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        },
      });
  }
}
