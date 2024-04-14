import { ExpenseState } from "../../../components/expenses/state/reducers/expenses.reducer";
import { AuthState } from "./auth.state";

export interface AppState {
    auth: AuthState;
    expenses: ExpenseState;
}