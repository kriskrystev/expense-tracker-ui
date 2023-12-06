import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { FormFieldErrorMessageComponent } from "../../ui/form-field-error-message/form-field-error-message.component";
import { NgIf } from "@angular/common";
import { CategoryService } from "../../../services/category.service";
import { take } from "rxjs";
import { ValidateForm } from "../../../core/decorators/validate-form.decorator";
import { ERROR_STATE_MATCHER_TOKEN } from "../../../core/utils/error-state-matcher";


@Component({
  selector: 'app-category-create',
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
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss'
})
export class CategoryCreateComponent implements OnInit {

  form!: FormGroup;
  matcher = inject(ERROR_STATE_MATCHER_TOKEN);

  constructor(
    private dialogRef: MatDialogRef<CategoryCreateComponent>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })
  }

  @ValidateForm()
  confirm(): void {
    this.categoryService.addCategory(this.form.value).pipe(
      take(1)
    ).subscribe({
      next: () => this.dialogRef.close(true)
    });
  }
}
