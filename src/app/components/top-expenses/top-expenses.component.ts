import { Component, Directive, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, NumberCardComponent } from '@swimlane/ngx-charts';
import { PageHeaderComponent } from '../ui/page-header/page-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../services/category.service';
import { PageOptionsDto } from '../../core/dto/page-options.dto';
import { Order } from '../../core/enums/order.enum';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { StatisticsService } from '../../services/statistics.service';
import { map } from 'rxjs';
import { CreateExpenseResponseDto } from '../../models/expenses/response/create-expense.dto';
@Directive({
  selector: '[zero-margin]',
  standalone: true,
})
export class NumberCardZeroMargin {
  constructor(@Self() numberCard: NumberCardComponent) {
    numberCard.margin = [0, 0, 0, 0];
  }
}

@Component({
  selector: 'app-top-expenses',
  templateUrl: './top-expenses.component.html',
  styleUrls: ['./top-expenses.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    ReactiveFormsModule,
    NgxChartsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NumberCardZeroMargin,
  ],
})
export class TopExpenses {
  categories = this.categoryService.categories;

  // TODO: fix any
  results: any[] = [];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d'],
  };
  cardColor: string = '#232837';

  formGroup = this.formBuilder.group({
    count: [],
    categoryId: [],
    startDate: [],
    endDate: [],
  });

  constructor(
    private categoryService: CategoryService,
    private statisticsService: StatisticsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.categoryService
      .getCategoriesPage(
        new PageOptionsDto(Order.DESC, 1, Number.MAX_SAFE_INTEGER)
      )
      .subscribe();

    this.formGroup.valueChanges.subscribe({
      next: (value) => console.log(value),
    });
  }

  fetchStats() {
    const payload = {
      top: this.formGroup.value.count || 5,
      from: this.formGroup.value.startDate || '',
      to: this.formGroup.value.endDate || '',
      categoryId: this.formGroup.value.categoryId || '',
    };
    // TODO: fix any
    this.statisticsService
      .findTopBetweenDates(payload)
      .pipe(
        map((results: any) => {
          return results.map((expense: any) => {
            return {
              name: expense.date,
              value: expense.amount,
            };
          });
        })
      )
      .subscribe({
        next: (results) => {
          this.results = results;
        },
      });
  }
}
