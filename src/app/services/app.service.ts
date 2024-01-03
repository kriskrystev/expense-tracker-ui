import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  sideNavContent = new Subject<{ content?: any; open: boolean }>();

  constructor() {}
}
