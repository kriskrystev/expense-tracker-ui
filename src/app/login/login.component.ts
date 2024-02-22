import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ERROR_STATE_MATCHER_TOKEN } from '../core/utils/error-state-matcher';
import { FormFieldErrorMessageComponent } from '../components/ui/form-field-error-message/form-field-error-message.component';
import { ValidateForm } from '../core/decorators/validate-form.decorator';
import { AuthService } from '../core/auth/auth.service';

const core = [NgIf, FormsModule, ReactiveFormsModule];

const material = [MatFormFieldModule, MatInputModule, MatButtonModule];
const internal = [FormFieldErrorMessageComponent];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...core, ...material, ...internal],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  matcher = inject(ERROR_STATE_MATCHER_TOKEN);

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  @ValidateForm()
  login(): void {
    this.authService
      .login(this.form.value.username, this.form.value.password)
      .subscribe();
  }
}
