import { createSelector } from "@ngrx/store";
import { AppState } from "../../interfaces/app.state";
import { AuthState } from "../../interfaces/auth.state";

export const selectAuthState = (state: AppState) => state.auth;

export const selectLoginLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.loading
);

export const selectHasAccessToken = createSelector(
    selectAuthState,
    (state: AuthState) => {
        const hasAccessToken = !!(state.access_token || localStorage.getItem('access_token'))

        return hasAccessToken;
    }
);