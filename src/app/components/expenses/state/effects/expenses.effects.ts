import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadExpenses, loadExpensesFailure, loadExpensesSuccess } from "../actions/expenses.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { ExpenseService } from "../../../../services/expense.service";

@Injectable()
export class ExpensesEffects {
    loadExpenses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadExpenses),
            switchMap((action) => {
                return this.expensesService.getAllExpenses(action.payload.pageOptions).pipe(
                    map((results) => loadExpensesSuccess({ payload: { expenses: results.data } })),
                    catchError((err) => of(loadExpensesFailure(err)))
                )
            })
        )
    })

    constructor(private actions$: Actions, private expensesService: ExpenseService) {

    }
}