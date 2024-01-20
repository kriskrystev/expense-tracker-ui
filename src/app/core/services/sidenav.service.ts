import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SidenavContent {
  component: any;
  inputs?: {};
  opened?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public componentData$ = new BehaviorSubject<SidenavContent>({
    component: null,
    opened: false,
  });

  open(value: SidenavContent) {
    this.componentData$.next({
      component: value.component,
      opened: true,
      inputs: value.inputs,
    });
  }

  close() {
    this.componentData$.next({ component: null, opened: false });
  }
}
