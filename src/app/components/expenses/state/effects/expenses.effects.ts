import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ExpenseService } from "../../../../services/expense.service";
import { deleteExpense, deleteExpenseFailure, deleteExpenseSuccess } from "../actions/expenses-delete.actions";
import { loadExpenses, loadExpensesFailure, loadExpensesSuccess } from "../actions/expenses-load.actions";
import { PageOptionsDto } from "../../../../core/dto/page-options.dto";
import { Order } from "../../../../core/enums/order.enum";
import { SidenavService } from "../../../../core/services/sidenav.service";

@Injectable()
export class ExpensesEffects {
    loadExpenses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadExpenses),
            switchMap((action) => {
                return this.expensesService.getAllExpenses(action.payload.pageOptions).pipe(
                    map((results) => loadExpensesSuccess({ payload: { expenses: results.data, metaData: results.meta } })),
                    catchError((err) => of(loadExpensesFailure(err)))
                )
            })
        )
    });

    deleteExpense$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteExpense),
            switchMap(({ payload: { expenseId } }) => {
                return this.expensesService.removeExpense(expenseId).pipe(
                    switchMap(() => {
                        this.sidenavService.close();
                        return of(
                            deleteExpenseSuccess(),
                            loadExpenses({
                                payload: {
                                    pageOptions: new PageOptionsDto(Order.DESC)
                                }
                            })
                        )
                    }),
                    catchError((err) => of(deleteExpenseFailure(err)))
                )
            })
        )
    });


    constructor(private actions$: Actions, private expensesService: ExpenseService, private sidenavService: SidenavService) {

    }
}