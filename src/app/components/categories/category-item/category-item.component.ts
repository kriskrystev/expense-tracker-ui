import {
  Component,
  EnvironmentInjector,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Confirmable } from '../../../core/decorators/confirmable.decorator';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryUi } from '../../../models/categories/ui/category';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss',
})
export class CategoryItemComponent {
  @Input() data!: CategoryUi;

  @Output() onCategoryDeleteClicked = new EventEmitter<string>();
  @Output() onEditCategoryClicked = new EventEmitter<CategoryUi>();

  #environmentInjector = inject(EnvironmentInjector);

  @Confirmable({
    title: 'Delete category',
    textPrompt: 'Are you sure you wish to delete this category?',
  })
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
