import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { PageMetaDto } from '../core/dto/page-meta.dto';
import { CreateExpenseRequestDto } from '../models/expenses/request/create-expense.dto';
import { Observable, tap } from 'rxjs';
import { PageOptionsDto } from '../core/dto/page-options.dto';
import { PageDto } from '../core/dto/page.dto';
import { HttpPageParamsBuilder } from '../core/builders/http-page-params.builder';
import { CreateExpenseResponseDto } from '../models/expenses/response/create-expense.dto';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  expenses = signal<CreateExpenseResponseDto[]>([]);
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
  ): Observable<CreateExpenseResponseDto> {
    return this.#http
      .post<CreateExpenseResponseDto>(`${this.#url}/expense`, payload)
      .pipe(
        tap((expense: CreateExpenseResponseDto) => {
          this.expenses.update((values: CreateExpenseResponseDto[]) => {
            return [...values, expense];
          });
        })
      );
  }
}
