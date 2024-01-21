import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { InjectionToken } from '@angular/core';

/** Error when invalid control is dirty, touched, or submitted. */
class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.touched || isSubmitted));
  }
}

export const ERROR_STATE_MATCHER_TOKEN = new InjectionToken<ErrorStateMatcher>(
  'A custom error state matcher class',
  {
    providedIn: 'root',
    factory: () => new CustomErrorStateMatcher(),
  }
);
