import { Directive, HostListener } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';

@Directive({
  standalone: true,
  selector: '[close-on-click]',
})
export class CloseDrawerDirective {
  constructor(private sidenavService: SidenavService) {}
  @HostListener('click') onClick() {
    this.sidenavService.close();
  }
}
