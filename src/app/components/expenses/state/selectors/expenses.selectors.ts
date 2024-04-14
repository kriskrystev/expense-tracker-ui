import { createSelector } from "@ngrx/store";
import { AppState } from "../../../../core/state/interfaces/app.state";
import { ExpenseState, adapter } from "../reducers/initial-state";

export const selectFeature = (state: AppState) => state.expenses;

export const selectExpensesLoading = createSelector(
    selectFeature,
    (state: ExpenseState) => state.loading
);

export const selectExpenses = createSelector(
    selectFeature,
    adapter.getSelectors().selectAll
);

export const selectExpensesMetaData = createSelector(
    selectFeature,
    (state: ExpenseState) => state.metaData
);