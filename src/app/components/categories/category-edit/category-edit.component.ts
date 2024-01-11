import { Component, EnvironmentInjector, inject, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { take } from 'rxjs';
import { ValidateForm } from '../../../core/decorators/validate-form.decorator';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldErrorMessageComponent } from '../../ui/form-field-error-message/form-field-error-message.component';
import { ERROR_STATE_MATCHER_TOKEN } from '../../../core/utils/error-state-matcher';
import { CategoryNameAsyncValidator } from '../../../core/validation/async-validator';
import { CategoryUi } from '../../../models/categories/ui/category';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,

    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormFieldErrorMessageComponent,
  ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss',
})
export class CategoryEditComponent {
  form!: FormGroup;
  matcher = inject(ERROR_STATE_MATCHER_TOKEN);
  initialCategoryName = '';

  constructor(
    private dialogRef: MatDialogRef<CategoryEditComponent>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private categoryNameAsyncValidator: CategoryNameAsyncValidator,
    @Inject(MAT_DIALOG_DATA) public data: CategoryUi
  ) {}

  ngOnInit(): void {
    this.initialCategoryName = this.data.name;
    const asyncValidator = this.categoryNameAsyncValidator
      .validateWithName(this.initialCategoryName)
      .bind(this);

    const nameFormControl = new FormControl(this.data.name || '', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),
      ],
      asyncValidators: [asyncValidator],
      // asyncValidators: [asyncValidator()],
    });

    this.form = this.formBuilder.group({
      name: nameFormControl,
      description: [this.data.description || '', Validators.required],
    });
  }

  @ValidateForm()
  confirm(): void {
    this.categoryService
      .updateCategory(this.data.id, this.form.value)
      .pipe(take(1))
      .subscribe({
        next: () => this.dialogRef.close(true),
      });
  }
}
