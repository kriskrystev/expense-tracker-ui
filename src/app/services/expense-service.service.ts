import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { PageMetaDto } from '../core/dto/page-meta.dto';
import { CreateExpenseDto } from '../models/expenses/request/create-expense.dto';
import { Observable, tap } from 'rxjs';
import { PageOptionsDto } from '../core/dto/page-options.dto';
import { PageDto } from '../core/dto/page.dto';
import { HttpPageParamsBuilder } from '../core/builders/http-page-params.builder';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  // TODO: replace any with proper types
  expenses = signal<any>([]);
  expensesPageInfo = signal<PageMetaDto>({
    take: 10,
    page: 1,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  #http = inject(HttpClient);
  #url = 'http://localhost:3000/api';

  constructor() {}

  getAllExpenses(pageOptionsDto: PageOptionsDto): Observable<PageDto<any>> {
    const httpPageParamsBuilder = new HttpPageParamsBuilder();
    const params = httpPageParamsBuilder
      .appendOrder(pageOptionsDto.order)
      .appendPage(pageOptionsDto.page)
      .appendSkip(pageOptionsDto.skip)
      .appendTake(pageOptionsDto.take)
      .build();

    return this.#http
      .get<PageDto<any>>(`${this.#url}/expense`, { params: params })
      .pipe(
        tap((pageDto: PageDto<any>) => {
          this.expenses.set(pageDto.data);
          this.expensesPageInfo.set(pageDto.meta);
        })
      );
  }

  createExpense(payload: CreateExpenseDto): Observable<any> {
    return this.#http.post(`${this.#url}/expense`, payload).pipe(
      tap((expense: any) => {
        this.expenses.update((values: any[]) => {
          return [...values, expense];
        });
      })
    );
  }
}
