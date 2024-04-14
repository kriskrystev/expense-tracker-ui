import { ExpenseState } from "../../../components/expenses/state/reducers/initial-state";
import { AuthState } from "./auth.state";

export interface AppState {
    auth: AuthState;
    expenses: ExpenseState;
}