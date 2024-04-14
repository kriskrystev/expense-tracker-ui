import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpPageParamsBuilder } from '../core/builders/http-page-params.builder';
import { PageOptionsDto } from '../core/dto/page-options.dto';
import { PageDto } from '../core/dto/page.dto';
import { Order } from '../core/enums/order.enum';
import { CreateExpenseRequestDto } from '../models/expenses/request/create-expense.dto';
import {
  UpdateExpenseRequestDto,
  UpdateExpenseResponseDto,
} from '../models/expenses/request/update-expense.dto';
import { CreateExpenseResponseDto } from '../models/expenses/response/create-expense.dto';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  #http = inject(HttpClient);
  #url = 'http://localhost/api';

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
  }

  createExpense(
    payload: CreateExpenseRequestDto
  ): Observable<PageDto<CreateExpenseResponseDto>> {
    payload.date = new Date(payload.date);
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
      .patch<UpdateExpenseResponseDto>(
        `${this.#url}/expense/${payload.id}`,
        payload
    );
  }

  removeExpense(id: string) {
    return this.#http.delete(`${this.#url}/expense/${id}`);
  }
}
