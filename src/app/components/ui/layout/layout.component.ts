import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule, NgComponentOutlet } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { SidenavService } from '../../../core/services/sidenav.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    NgComponentOutlet,
    RouterModule,
  ],
})
export class LayoutComponent {
  loggedIn = this.authService.loggedIn$;
  private breakpointObserver = inject(BreakpointObserver);
  componentData$ = this.sidenavService.componentData$;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private sidenavService: SidenavService,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        tap(() => this.sidenavService.close())
      )
      .subscribe();
  }

  logout() {
    this.authService.logout();
  }
}
