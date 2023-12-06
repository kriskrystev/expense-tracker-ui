import { ErrorRendererStrategy } from "../error-renderer.strategy";

export class GenericErrorRendererStrategy implements ErrorRendererStrategy {
  execute(): string {
    return "This field is invalid";
  }
}
