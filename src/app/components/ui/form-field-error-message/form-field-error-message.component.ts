import { NgIf } from '@angular/common';
import {
  Component,
  DestroyRef,
  EnvironmentInjector,
  inject,
  Input,
  OnChanges,
  ProviderToken,
  runInInjectionContext
} from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ParameterizedValidation } from '../../../core/mixin/validation-errors..mixin';
import { ErrorRendererStrategy } from '../../../core/strategy/error-handling/error-renderer.strategy';
import { ErrorStrategiesMap } from '../../../core/strategy/error-handling/error-strategies-map';
import { GENERIC_RENDERER_INJECTION_TOKEN } from '../../../core/strategy/error-handling/tokens/injection-tokens';

@Component({
  selector: 'app-form-field-error-message',
  standalone: true,
  imports: [NgIf, MatFormFieldModule],
  templateUrl: './form-field-error-message.component.html',
  styleUrl: './form-field-error-message.component.scss',
})
export class FormFieldErrorMessageComponent implements OnChanges {
  @Input() control!: AbstractControl;
  @Input() controlErrors!: ValidationErrors;
  @Input() isErrorState!: boolean;
  @Input() validationParameters: ValidationErrors = {};

  rendererStrategy!: (ErrorRendererStrategy & ParameterizedValidation) | null;

  environmentInjector = inject(EnvironmentInjector);
  destroyRef = inject(DestroyRef);

  ngOnChanges() {
    runInInjectionContext(this.environmentInjector, () => {
      const errorsObject = this.controlErrors;

      if (errorsObject !== null && this.isErrorState) {
        const firstError = Object.keys(errorsObject)[0];
        const token: ProviderToken<
          ErrorRendererStrategy & ParameterizedValidation
        > =
          ErrorStrategiesMap.get(firstError) ||
          GENERIC_RENDERER_INJECTION_TOKEN;
        this.rendererStrategy = inject(token);
        if ('setValidationParameters' in this.rendererStrategy) {
          this.rendererStrategy?.setValidationParameters(
            this.validationParameters
          );
        }
      }
    });
  }
}
