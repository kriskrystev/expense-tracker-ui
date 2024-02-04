import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseUi } from '../models/expenses/ui/expense';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  findTopBetweenDates(params: {
    top: number;
    from: string;
    to: string;
    categoryId: string;
  }): Observable<ExpenseUi[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('top', params.top)
      .append('from', params.from)
      .append('to', params.to)
      .append('categoryId', params.categoryId);
    return this.http.get<ExpenseUi[]>('http://localhost/api/statistics', {
      params: queryParams,
    });
  }
}
