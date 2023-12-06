export function ValidateForm() {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const form = (this as any).form;

      if (form.invalid) {
        form.markAllAsTouched();
        return;
      }

      originalMethod.apply(this, args);
    }

    return descriptor;
  }
}
