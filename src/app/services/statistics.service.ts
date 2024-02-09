import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExpenseUi } from '../models/expenses/ui/expense';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getTotalExpensesForEachCategory() {
    return this.http.get('http://localhost/api/statistics/total-expenses');
  }

  getCategoryExtremes(): Observable<{ min: number; max: number }> {
    return this.http.get<{ min: number; max: number }>(
      'http://localhost/api/statistics/category-extremes'
    );
  }

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
