import { inject, runInInjectionContext } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmationDialogComponent } from '../../components/ui/confirmation-dialog/confirmation-dialog.component';

export function Confirmable(options?: any) {
  return (
    _target: Object,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    if (!options) {
      options = {
        title: 'Delete entity',
        textPrompt: 'Are you sure you wish to delete this entity?',
      };
    }

    descriptor.value = async function (...args: any[]) {
      const envInjector = (this as any).getEnvironmentInjector();

      await runInInjectionContext(envInjector, async () => {
        const dialogRef = inject(MatDialog).open(ConfirmationDialogComponent, {
          data: {
            title: options.title,
            textPrompt: options.textPrompt,
          },
        });
        const confirm = await firstValueFrom(dialogRef.afterClosed());

        if (confirm) {
          return originalMethod.apply(this, args);
        }
      });
    };

    return descriptor;
  };
}
