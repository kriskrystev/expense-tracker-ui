import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { login, loginFailure, loginSuccess, logout, logoutSuccess } from "../actions/auth.action";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { AuthService } from "../../../auth/auth.service";

@Injectable()
export class AuthEffects {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(login),
            switchMap(({ payload: { username, password } }) => {
                return this.authService.login(username, password).pipe(
                    map((response) => {
                        this.authService.setAccessToken(response.access_token);
                        return loginSuccess({ payload: response });
                    }),
                    catchError((e) => of(loginFailure(e)))
                )
            })
        )
    });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logout),
            switchMap(() => {
                this.authService.logout();
                return of(logoutSuccess());
            })
        )
    });

    constructor(
        private authService: AuthService,
        private actions$: Actions
    ) {
    }
}