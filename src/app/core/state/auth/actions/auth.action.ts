import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[Auth] Login',
    props<{
        payload: {
            username: string,
            password: string
        }
    }>()
);

export const loginSuccess = createAction(
    '[Auth] Login success',
    props<{
        payload: {
            access_token: string
        }
    }>()
);

export const loginFailure = createAction(
    '[Auth] Login failure',
    props<{
        payload: HttpErrorResponse
    }>()
);

export const logout = createAction(
    '[Auth] Logout'
);

export const logoutSuccess = createAction(
    '[Auth] Logout success'
);