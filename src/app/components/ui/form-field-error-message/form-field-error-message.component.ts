import {
  Component,
  DestroyRef,
  EnvironmentInjector,
  inject,
  Input,
  OnChanges,
  ProviderToken,
  runInInjectionContext,
  SimpleChanges
} from '@angular/core';
import { AbstractControl } from "@angular/forms";
import { ErrorRendererStrategy } from "../../../core/strategy/error-renderer.strategy";
import { ErrorStrategiesMap, GENERIC_RENDERER_INJECTION_TOKEN } from "../../../core/strategy/error-strategies-map";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-form-field-error-message',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule
  ],
  templateUrl: './form-field-error-message.component.html',
  styleUrl: './form-field-error-message.component.scss',
})
export class FormFieldErrorMessageComponent implements OnChanges {

  @Input() control!: AbstractControl;
  @Input() isErrorState!: boolean;

  rendererStrategy!: ErrorRendererStrategy | null;

  environmentInjector = inject(EnvironmentInjector);
  destroyRef = inject(DestroyRef);

  ngOnChanges(changes: SimpleChanges) {
    runInInjectionContext(this.environmentInjector, () => {
      const errorsObject = this.control.errors;

      if (errorsObject !== null && this.isErrorState) {
        const firstError = Object.keys(errorsObject)[0];
        const token: ProviderToken<ErrorRendererStrategy> = ErrorStrategiesMap.get(firstError) || GENERIC_RENDERER_INJECTION_TOKEN;
        this.rendererStrategy = inject(token);
      } else {
        this.rendererStrategy = null;
      }
    })
  }
}
