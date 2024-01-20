import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { PageMetaDto } from '../core/dto/page-meta.dto';
import { CreateExpenseRequestDto } from '../models/expenses/request/create-expense.dto';
import { Observable, switchMap, tap } from 'rxjs';
import { PageOptionsDto } from '../core/dto/page-options.dto';
import { PageDto } from '../core/dto/page.dto';
import { HttpPageParamsBuilder } from '../core/builders/http-page-params.builder';
import { CreateExpenseResponseDto } from '../models/expenses/response/create-expense.dto';
import { Order } from '../core/enums/order.enum';
import { UpdateExpenseRequestDto } from '../models/expenses/request/update-expense.dto';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  expenses = signal<CreateExpenseResponseDto[]>([]);
  expensesPageInfo = signal<PageMetaDto>({
    take: 5,
    page: 1,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  #http = inject(HttpClient);
  #url = 'http://localhost:3000/api';

  getAllExpenses(
    pageOptionsDto: PageOptionsDto
  ): Observable<PageDto<CreateExpenseResponseDto>> {
    const httpPageParamsBuilder = new HttpPageParamsBuilder();
    const params = httpPageParamsBuilder
      .appendOrder(pageOptionsDto.order)
      .appendPage(pageOptionsDto.page)
      .appendSkip(pageOptionsDto.skip)
      .appendTake(pageOptionsDto.take)
      .append('explode', true)
      .build();

    return this.#http
      .get<PageDto<CreateExpenseResponseDto>>(`${this.#url}/expense`, {
        params: params,
      })
      .pipe(
        tap((pageDto: PageDto<CreateExpenseResponseDto>) => {
          this.expenses.set(pageDto.data);
          this.expensesPageInfo.set(pageDto.meta);
        })
      );
  }

  createExpense(
    payload: CreateExpenseRequestDto
  ): Observable<PageDto<CreateExpenseResponseDto>> {
    return this.#http
      .post<CreateExpenseResponseDto>(`${this.#url}/expense`, payload)
      .pipe(
        switchMap(() => {
          return this.getAllExpenses(new PageOptionsDto(Order.DESC));
        })
      );
  }

  updateExpense(payload: UpdateExpenseRequestDto) {
    return this.#http
      .patch(`${this.#url}/expense/${payload.id}`, payload)
      .pipe(tap((data) => console.log(data)));
  }

  removeExpense(id: string) {
    return this.#http.delete(`${this.#url}/expense/${id}`).pipe(
      switchMap(() => {
        return this.getAllExpenses(new PageOptionsDto(Order.DESC));
      })
    );
  }
}
