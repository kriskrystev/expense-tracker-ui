import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { PageOptionsDto } from "../../../../core/dto/page-options.dto";
import { ExpenseUi } from "../../../../models/expenses/ui/expense";
import { PageMetaDto } from "../../../../core/dto/page-meta.dto";

const actionPrefix = '[Expenses]';

export const loadExpenses = createAction(
    `${actionPrefix} Load expenses`,
    props<{
        payload: {
            pageOptions: PageOptionsDto
        }
    }>()
);

export const loadExpensesSuccess = createAction(
    `${actionPrefix} Load expenses success`,
    props<{
        payload: {
            expenses: ExpenseUi[],
            metaData: PageMetaDto
        }
    }>()
);

export const loadExpensesFailure = createAction(
    `${actionPrefix} Load expenses failure`,
    props<{
        payload: HttpErrorResponse
    }>()
);