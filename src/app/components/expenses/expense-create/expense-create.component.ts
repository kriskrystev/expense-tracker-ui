import { Component, OnInit, inject } from '@angular/core';
import { ERROR_STATE_MATCHER_TOKEN } from '../../../core/utils/error-state-matcher';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldErrorMessageComponent } from '../../ui/form-field-error-message/form-field-error-message.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { PageOptionsDto } from '../../../core/dto/page-options.dto';
import { Order } from '../../../core/enums/order.enum';
import { ValidateForm } from '../../../core/decorators/validate-form.decorator';
import { ExpenseService } from '../../../services/expense.service';
import { take } from 'rxjs';
import { MatNativeDateModule } from '@angular/material/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { CloseDrawerDirective } from '../../../core/directives/close-drawer.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SidenavService } from '../../../core/services/sidenav.service';
const core = [NgIf, FormsModule, ReactiveFormsModule];

const material = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
];

const internal = [FormFieldErrorMessageComponent, CloseDrawerDirective];

@Component({
  selector: 'app-expense-create',
  standalone: true,
  imports: [...core, ...material, ...internal],
  templateUrl: './expense-create.component.html',
  styleUrl: './expense-create.component.scss',
})
export class ExpenseCreateComponent implements OnInit {
  form!: FormGroup;
  matcher = inject(ERROR_STATE_MATCHER_TOKEN);

  categories = this.categoryService.categories;

  closeOnSubmit = true;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: ['', [Validators.maxLength(255)]],
      amount: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.categoryService
      .getCategoriesPage(
        new PageOptionsDto(Order.DESC, 1, Number.MAX_SAFE_INTEGER)
      )
      .subscribe();
  }

  @ValidateForm()
  public confirm(): void {
    this.expenseService
      .createExpense(this.form.value)
      .pipe(take(1))
      .subscribe({
        next: () => {
          if (this.closeOnSubmit) {
            this.sidenavService.close();
          } else {
            this.form.reset();
          }
        },
      });
  }
}
