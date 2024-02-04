import { inject, Injectable, signal } from '@angular/core';
import { CreateCategoryDto } from '../models/categories/request/create-category.dto';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { UpdateCategoryDto } from '../models/categories/request/update-category.dto';
import { PageOptionsDto } from '../core/dto/page-options.dto';
import { PageDto } from '../core/dto/page.dto';
import { HttpPageParamsBuilder } from '../core/builders/http-page-params.builder';
import { PageMetaDto } from '../core/dto/page-meta.dto';
import { Order } from '../core/enums/order.enum';
import { CreateCategoryResponseDto } from '../models/categories/response/read-category.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories = signal<CreateCategoryResponseDto[]>([]);
  categoriesPageInfo = signal<PageMetaDto>({
    take: 5,
    page: 1,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  #http = inject(HttpClient);
  #url = 'http://localhost/api';

  getCategoriesPage(
    pageOptionsDto: PageOptionsDto
  ): Observable<PageDto<CreateCategoryResponseDto>> {
    const httpPageParamsBuilder = new HttpPageParamsBuilder();
    const params = httpPageParamsBuilder
      .appendOrder(pageOptionsDto.order)
      .appendPage(pageOptionsDto.page)
      .appendSkip(pageOptionsDto.skip)
      .appendTake(pageOptionsDto.take)
      .build();

    return this.#http
      .get<PageDto<CreateCategoryResponseDto>>(`${this.#url}/category`, {
        params: params,
      })
      .pipe(
        tap((pageDto: PageDto<CreateCategoryResponseDto>) => {
          this.categories.set(pageDto.data);
          this.categoriesPageInfo.set(pageDto.meta);
        })
      );
  }

  addCategory(
    payload: CreateCategoryDto
  ): Observable<PageDto<CreateCategoryResponseDto>> {
    return this.#http
      .post<CreateCategoryResponseDto>(`${this.#url}/category`, payload)
      .pipe(
        switchMap(() => {
          return this.getCategoriesPage(new PageOptionsDto(Order.DESC));
        })
      );
  }

  updateCategory(id: string, payload: UpdateCategoryDto) {
    return this.#http
      .patch<CreateCategoryResponseDto>(`${this.#url}/category/${id}`, payload)
      .pipe(
        tap((category) => {
          this.categories.update((values: CreateCategoryResponseDto[]) => {
            return values.map((element) => {
              if (element.id === id) {
                return { ...category };
              }
              return element;
            });
          });
        })
      );
  }

  removeCategory(id: string) {
    return this.#http.delete(`${this.#url}/category/${id}`).pipe(
      switchMap(() => {
        return this.getCategoriesPage(new PageOptionsDto(Order.DESC));
      })
    );
  }

  checkIfExists(name: string): Observable<boolean> {
    return this.#http.post<boolean>(`${this.#url}/category/check-if-exists`, {
      name,
    });
  }
}
