import { Component, inject, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CategoryItemComponent } from './category-item/category-item.component';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderComponent } from '../ui/page-header/page-header.component';
import { CategoryService } from '../../services/category.service';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { MatDialog } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { Category } from '../../models/categories/response/read-category.dto';
import { PageOptionsDto } from '../../core/dto/page-options.dto';
import { Order } from '../../core/enums/order.enum';

const coreImports = [NgFor];

const materialImports = [
  MatGridListModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
];

const internalImports = [CategoryItemComponent, PageHeaderComponent];

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [...coreImports, ...materialImports, ...internalImports],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  #dialog = inject(MatDialog);
  #categoriesService = inject(CategoryService);

  categories = this.#categoriesService.categories;

  ngOnInit(): void {
    this.#categoriesService
      .getAllCategories(new PageOptionsDto(Order.DESC))
      .subscribe();
  }

  deleteCategory(id: string): void {
    this.#categoriesService.removeCategory(id).subscribe();
  }

  openEditDialog(category: Category): void {
    this.#dialog.open(CategoryEditComponent, {
      data: {
        ...category,
      },
      width: '400px',
      height: '470px',
    });
  }

  openCreateDialog(): void {
    this.#dialog.open(CategoryCreateComponent, {
      width: '400px',
      height: '470px',
    });
  }
}
