import { createReducer, on } from "@ngrx/store";
import { loadExpenses, loadExpensesFailure, loadExpensesSuccess } from "../actions/expenses.actions";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { ExpenseUi } from "../../../../models/expenses/ui/expense";

export const adapter: EntityAdapter<ExpenseUi> = createEntityAdapter<ExpenseUi>();

export interface ExpenseState extends EntityState<ExpenseUi> {
    loading: boolean;
}

export const initialState: ExpenseState = adapter.getInitialState({
    loading: false
});


export const expensesReducer = createReducer(
    initialState,
    on(loadExpenses, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadExpensesSuccess, (state, action) => {
        return adapter.addMany(action.payload.expenses, { ...state, loading: false })
    }),
    on(loadExpensesFailure, (state, action) => {
        return {
            ...state,
            loading: false,
        }
    })
);