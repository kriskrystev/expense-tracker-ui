import { on } from "@ngrx/store";
import { deleteExpense, deleteExpenseFailure, deleteExpenseSuccess } from "../actions/expenses-delete.actions";
import { ExpenseState } from "./initial-state";

export function expensesDeleteOnHandlers() {
    return [
        on(deleteExpense, (state: ExpenseState) => {
            return {
                ...state,
                loading: true
            }
        }),
        on(deleteExpenseSuccess, (state: ExpenseState) => {
            return {
                ...state,
                loading: false
            }
        }),
        on(deleteExpenseFailure, (state: ExpenseState) => {
            return {
                ...state,
                loading: false
            }
        })
    ]
};