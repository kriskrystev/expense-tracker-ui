import { RequiredErrorRendererStrategy } from "./implementation/required-error-renderer-strategy";
import { InjectionToken } from "@angular/core";
import { GenericErrorRendererStrategy } from "./implementation/generic-error-renderer-strategy";

export const REQUIRED_RENDERER_INJECTION_TOKEN = new InjectionToken<RequiredErrorRendererStrategy>('Required fields error message', {
  providedIn: 'root',
  factory: () => new RequiredErrorRendererStrategy()
});

export const GENERIC_RENDERER_INJECTION_TOKEN = new InjectionToken<RequiredErrorRendererStrategy>('Generic invalid field message', {
  providedIn: 'root',
  factory: () => new GenericErrorRendererStrategy()
})

export const ErrorStrategiesMap = new Map([
  ['required', REQUIRED_RENDERER_INJECTION_TOKEN]
]);
