import { ValidationErrors } from '@angular/forms';
import { Constructor } from './constructor.type';

export interface ParameterizedValidation {
  validationParameters: ValidationErrors;

  setValidationParameters(validationParameters: ValidationErrors): void;

  getValidationParameters(): ValidationErrors;
}

export function WithParameterizedValidation<TBase extends Constructor>(
  BaseClass?: TBase
) {
  const defaultClass = class {};
  const SuperClass = BaseClass === undefined ? defaultClass : BaseClass;

  return class ParameterizedValidatorMessage
    extends SuperClass
    implements ParameterizedValidation
  {
    validationParameters: ValidationErrors = {};

    setValidationParameters(validationParameters: ValidationErrors) {
      this.validationParameters = validationParameters;
    }

    getValidationParameters(): ValidationErrors {
      return this.validationParameters;
    }
  };
}
