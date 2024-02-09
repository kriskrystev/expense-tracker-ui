import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';
import { TopExpenses } from '../top-expenses/top-expenses.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [MatIconModule, NgxChartsModule, TopExpenses],
})
export class DashboardComponent implements OnInit {
  pieChartData: any[] = [];
  extremes = { min: 0, max: 0 };
  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.getTotalExpensesForEachCategory().subscribe({
      next: (payload: any) => {
        let dt = [];
        for (const key in payload.results) {
          if (Object.prototype.hasOwnProperty.call(payload.results, key)) {
            const element: any = payload.results[key];
            dt.push({
              name: key,
              value: element.expenseSum,
            });
          }
        }
        this.pieChartData = dt;
      },
    });

    this.statisticsService.getCategoryExtremes().subscribe({
      next: (extremes: { min: number; max: number }) => {
        this.extremes = extremes;
      },
    });
  }
}
