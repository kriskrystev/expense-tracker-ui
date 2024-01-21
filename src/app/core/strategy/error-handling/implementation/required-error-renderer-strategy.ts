import { ErrorRendererStrategy } from '../error-renderer.strategy';

export class RequiredErrorRendererStrategy implements ErrorRendererStrategy {
  execute(): string {
    return 'This field is required';
  }
}
