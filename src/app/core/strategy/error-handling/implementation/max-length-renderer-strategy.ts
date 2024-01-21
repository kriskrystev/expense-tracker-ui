import { WithParameterizedValidation } from '../../../mixin/validation-errors..mixin';
import { ErrorRendererStrategy } from '../error-renderer.strategy';

export class MaxLengthRendererStrategy
  extends WithParameterizedValidation()
  implements ErrorRendererStrategy
{
  execute(): string {
    return `Max character length is ${
      this.getValidationParameters()['maxlength']
    }`;
  }
}
