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
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/interfaces/app.state';
import { selectHasAccessToken } from '../../../core/state/auth/selectors/auth.selectors';
import { logout } from '../../../core/state/auth/actions/auth.action';

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
  loggedIn$ = this.store.select(selectHasAccessToken);
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
    private store: Store<AppState>
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        tap(() => this.sidenavService.close())
      )
      .subscribe();
  }

  logout() {
    this.store.dispatch(logout());
  }
}
