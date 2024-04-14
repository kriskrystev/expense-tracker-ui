import { on } from "@ngrx/store";
import { loadExpenses, loadExpensesFailure, loadExpensesSuccess } from "../actions/expenses-load.actions";
import { ExpenseState, adapter } from "./initial-state";

export function expensesLoadOnHandlers() {
    return [
        on(loadExpenses, (state: ExpenseState) => {
            return {
                ...state,
                loading: true
            }
        }),
        on(loadExpensesSuccess, (state: ExpenseState, action) => {
            // I don't like this
            state = {
                ...state,
                loading: false,
                metaData: action.payload.metaData
            };

            return adapter.setAll(action.payload.expenses, state);
        }),
        on(loadExpensesFailure, (state: ExpenseState) => {
            return {
                ...state,
                loading: false,
            }
        }),
    ]
}
