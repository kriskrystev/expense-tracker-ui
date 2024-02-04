import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  }) {
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append('top', params.top)
      .append('from', params.from)
      .append('to', params.to)
      .append('categoryId', params.categoryId);
    return this.http.get('http://localhost/api/statistics', {
      params: queryParams,
    });
  }
}
