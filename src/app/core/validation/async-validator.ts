import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, of, switchMap, timer } from "rxjs";
import { CategoryService } from "../../services/category.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryNameAsyncValidator implements AsyncValidator {

  constructor(private categoryService: CategoryService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return timer(500).pipe(
      switchMap(() => this.categoryService.checkIfExists(control.value)),
      map((exists: boolean) => {
          if (exists) {
            return { categoryExists: true };
          }
          return null;
        }
      )
    );
  }
}
