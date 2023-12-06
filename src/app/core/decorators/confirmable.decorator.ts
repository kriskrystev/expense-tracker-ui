import { ConfirmationDialogComponent } from "../../components/ui/confirmation-dialog/confirmation-dialog.component";
import { inject, runInInjectionContext } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom } from "rxjs";

export function Confirmable(options?: any) {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    // create default config
    // overwrite all config values if any config available

    descriptor.value = async function (...args: any[]) {
      const envInjector = (this as any).getEnvironmentInjector();

      await runInInjectionContext(envInjector, async () => {
        const dialogRef = inject(MatDialog).open(ConfirmationDialogComponent);
        const confirm = await firstValueFrom(dialogRef.afterClosed());

        if (confirm) {
          return originalMethod.apply(this, args);
        }
      });
    }

    return descriptor;
  }
}
