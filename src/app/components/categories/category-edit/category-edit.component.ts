import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { CategoryService } from "../../../services/category.service";
import { take } from "rxjs";
import { ValidateForm } from "../../../core/decorators/validate-form.decorator";
import { Category } from "../../../models/categories/response/read-category.dto";
import { NgIf } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormFieldErrorMessageComponent } from "../../ui/form-field-error-message/form-field-error-message.component";
import { ERROR_STATE_MATCHER_TOKEN } from "../../../core/utils/error-state-matcher";

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
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent {
  form!: FormGroup;
  matcher = inject(ERROR_STATE_MATCHER_TOKEN);

  constructor(
    private dialogRef: MatDialogRef<CategoryEditComponent>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.data.name || "", Validators.required],
      description: [this.data.description || "", Validators.required],
    })
  }

  @ValidateForm()
  confirm(): void {
    this.categoryService.updateCategory(this.data.id, this.form.value).pipe(
      take(1)
    ).subscribe({
      next: () => this.dialogRef.close(true)
    });
  }
}
