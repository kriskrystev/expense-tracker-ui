import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

const actionsPrefix = '[Expenses]';

export const deleteExpense = createAction(
    `${actionsPrefix} Delete expense`,
    props<{
        payload: {
            expenseId: string
        }
    }>()

);

export const deleteExpenseSuccess = createAction(
    `${actionsPrefix} Delete expense success`,
);

export const deleteExpenseFailure = createAction(
    `${actionsPrefix} Delete expense failure`,
    props<{
        payload: HttpErrorResponse
    }>()
);

