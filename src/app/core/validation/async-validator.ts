import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from '../../services/category.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryNameAsyncValidator implements AsyncValidator {
  constructor(private categoryService: CategoryService) {}

  validateWithName(initialName: string) {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      return timer(500).pipe(
        switchMap(() => this.categoryService.checkIfExists(control.value)),
        map((exists: boolean) => {
          if (exists && initialName !== control.value) {
            return { categoryExists: true };
          }
          return null;
        })
      );
    };
  }

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return timer(500).pipe(
      switchMap(() => this.categoryService.checkIfExists(control.value)),
      map((exists: boolean) => {
        if (exists) {
          return { categoryExists: true };
        }
        return null;
      })
    );
  }
}
