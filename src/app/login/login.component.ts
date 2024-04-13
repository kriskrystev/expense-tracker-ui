import { AsyncPipe, NgIf } from '@angular/common';
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
import { Store } from '@ngrx/store';
import { login } from '../core/state/auth/actions/auth.action';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { selectLoginLoading } from '../core/state/auth/selectors/auth.selectors';
import { AppState } from '../core/state/interfaces/app.state';

const core = [NgIf, FormsModule, AsyncPipe, ReactiveFormsModule];
const material = [MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule];
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
  loading$ = this.store.select(selectLoginLoading);

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  @ValidateForm()
  login(): void {
    this.store.dispatch(login({ payload: { ...this.form.value } }));
  }
}
