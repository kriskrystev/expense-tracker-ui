import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  pieChartData: any[] = [];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.getTotalExpensesForEachCategory().subscribe({
      next: (res: any) => {
        let dt = [];
        for (const key in res) {
          if (Object.prototype.hasOwnProperty.call(res, key)) {
            const element: any = res[key];
            dt.push({
              name: key,
              value: element.expenseSum,
            });
          }
        }
        this.pieChartData = dt;
      },
    });
  }
}
