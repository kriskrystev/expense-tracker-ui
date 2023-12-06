import { RequiredErrorRendererStrategy } from "./implementation/required-error-renderer-strategy";
import { InjectionToken } from "@angular/core";
import { GenericErrorRendererStrategy } from "./implementation/generic-error-renderer-strategy";
import { CATEGORY_NAME_EXISTS_INJECTION_TOKEN, REQUIRED_RENDERER_INJECTION_TOKEN } from "./tokens/injection-tokens";

export const ErrorStrategiesMap = new Map([
  ['required', REQUIRED_RENDERER_INJECTION_TOKEN],
  ['categoryExists', CATEGORY_NAME_EXISTS_INJECTION_TOKEN]
]);
