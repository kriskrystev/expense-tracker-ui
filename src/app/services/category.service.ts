import { inject, Injectable, signal } from '@angular/core';
import { Category } from "../models/categories/response/read-category.dto";
import { CreateCategoryDto } from "../models/categories/request/create-category.dto";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { UpdateCategoryDto } from "../models/categories/request/update-category.dto";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories = signal<Category[]>([]);

  #http = inject(HttpClient);
  #url = "http://localhost:3000/api";

  getAllCategories(): Observable<Category[]> {
    return this.#http.get<Category[]>(`${this.#url}/category`).pipe(
      tap((categoriesList: Category[]) => {
        this.categories.set(categoriesList);
      })
    );
  }

  addCategory(payload: CreateCategoryDto): Observable<Category> {
    return this.#http.post<Category>(`${this.#url}/category`, payload)
      .pipe(
        tap((category: Category) => {
          this.categories.update((values: Category[]) => {
            return [
              ...values,
              category
            ];
          })
        })
      );
  }

  updateCategory(id: string, payload: UpdateCategoryDto) {
    return this.#http.patch<Category>(`${this.#url}/category/${id}`, payload)
      .pipe(
        tap((category) => {
          this.categories.update((values: Category[]) => {
            return values.map(element => {
              if (element.id === id) {
                  return { ...category };
              }
              return element;
            })
          })
        })
      );
  }

  removeCategory(id: string) {
    return this.#http.delete(`${this.#url}/category/${id}`).pipe(
      tap(() => {
        this.categories.update(values => {
          return values.filter((value => value.id !== id));
        });
      })
    );
  }
}

