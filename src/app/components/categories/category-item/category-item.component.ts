import { Component, EnvironmentInjector, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../ui/confirmation-dialog/confirmation-dialog.component";
import { MatIconModule } from "@angular/material/icon";
import { Confirmable } from "../../../core/decorators/confirmable.decorator";
import { MatDividerModule } from "@angular/material/divider";
import { CategoryCreateComponent } from "../category-create/category-create.component";
import { Category } from "../../../models/categories/response/read-category.dto";

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss'
})
export class CategoryItemComponent {

  @Input() data!: Category;

  @Output() onCategoryDeleteClicked = new EventEmitter<string>();
  @Output() onEditCategoryClicked = new EventEmitter<Category>();

  #environmentInjector = inject(EnvironmentInjector);

  @Confirmable()
  deleteCategory() {
    this.onCategoryDeleteClicked.emit(this.data.id);
  }

  getEnvironmentInjector() {
    return this.#environmentInjector;
  }

  editCategory() {
    this.onEditCategoryClicked.emit(this.data);
  }

}
