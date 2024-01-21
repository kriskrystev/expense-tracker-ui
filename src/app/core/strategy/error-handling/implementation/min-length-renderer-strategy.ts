import { WithParameterizedValidation } from '../../../mixin/validation-errors..mixin';
import { ErrorRendererStrategy } from '../error-renderer.strategy';

export class MinLengthRendererStrategy
  extends WithParameterizedValidation()
  implements ErrorRendererStrategy
{
  execute(): string {
    return `Min character length is ${
      this.getValidationParameters()['minlength']
    }`;
  }
}
