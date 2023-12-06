import { ErrorRendererStrategy } from "../error-renderer.strategy";

export class CategoryNameConflictStrategy implements ErrorRendererStrategy {
  execute(): string {
    return "This category name already exists";
  }
}
