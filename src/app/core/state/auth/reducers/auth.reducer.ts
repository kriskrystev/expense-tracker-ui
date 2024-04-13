import { createReducer, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess, logout, logoutSuccess } from "../actions/auth.action";
import { AuthState } from "../../interfaces/auth.state";

export const initialState: AuthState = {
    loading: false,
    access_token: null
};

export const authReducer = createReducer(
    initialState,
    on(login, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(loginSuccess, (state, { payload: { access_token } }) => {
        return {
            ...state,
            loading: false,
            access_token
        }
    }),
    on(loginFailure, (state) => {
        return {
            ...state,
            loading: false,
            access_token: null
        }
    }),
    on(logoutSuccess, (state) => {
        return {
            ...state,
            access_token: null
        }
    })
);