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

const core = [NgIf, FormsModule, ReactiveFormsModule];

const material = [MatFormFieldModule, MatInputModule, MatButtonModule];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...core, ...material],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  matcher = inject(ERROR_STATE_MATCHER_TOKEN);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
