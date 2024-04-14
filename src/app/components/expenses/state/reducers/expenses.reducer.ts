import { createReducer } from "@ngrx/store";
import { expensesDeleteOnHandlers } from "./expenses-delete-on-handlers";
import { expensesLoadOnHandlers } from "./expenses-load-on-handlers";
import { initialState } from "./initial-state";

export const expensesReducer = createReducer(
    initialState,
    ...expensesLoadOnHandlers(),
    ...expensesDeleteOnHandlers()
)