import { createSelector } from "@ngrx/store";
import { AppState } from "../../../../core/state/interfaces/app.state";
import { ExpenseState, adapter } from "../reducers/expenses.reducer";

export const selectFeature = (state: AppState) => state.expenses;

export const selectExpensesLoading = createSelector(
    selectFeature,
    (state: ExpenseState) => state.loading
);

export const selectExpenses = createSelector(
    selectFeature,
    adapter.getSelectors().selectAll
);