import { InjectionToken } from "@angular/core";
import { RequiredErrorRendererStrategy } from "../implementation/required-error-renderer-strategy";
import { GenericErrorRendererStrategy } from "../implementation/generic-error-renderer-strategy";
import { CategoryNameConflictStrategy } from "../implementation/category-name-conflict-strategy";

export const CATEGORY_NAME_EXISTS_INJECTION_TOKEN = new InjectionToken<RequiredErrorRendererStrategy>('Required fields error message', {
  providedIn: 'root',
  factory: () => new CategoryNameConflictStrategy()
});

export const REQUIRED_RENDERER_INJECTION_TOKEN = new InjectionToken<RequiredErrorRendererStrategy>('Required fields error message', {
  providedIn: 'root',
  factory: () => new RequiredErrorRendererStrategy()
});

export const GENERIC_RENDERER_INJECTION_TOKEN = new InjectionToken<RequiredErrorRendererStrategy>('Generic invalid field message', {
  providedIn: 'root',
  factory: () => new GenericErrorRendererStrategy()
})
