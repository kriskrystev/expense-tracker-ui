import { createReducer, on } from "@ngrx/store";
import { AuthState } from "../../interfaces/auth.state";
import { login, loginFailure, loginSuccess, logoutSuccess } from "../actions/auth.action";

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