import {
  Component,
  Injectable,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ExpenseService } from '../../../services/expense-service.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Injectable()
class ExpensesTableDataSource extends DataSource<any> {
  private expenseService = inject(ExpenseService);
  private dataStream = toObservable(this.expenseService.expenses);

  override disconnect(collectionViewer: CollectionViewer): void {}
  override connect(
    collectionViewer: CollectionViewer
  ): Observable<readonly any[]> {
    return this.dataStream;
  }
}

@Component({
  selector: 'app-expenses-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.scss',
  providers: [
    {
      provide: ExpensesTableDataSource,
    },
  ],
})
export class ExpensesTableComponent {
  displayedColumns: string[] = ['category', 'amount', 'description'];
  dataSource = inject(ExpensesTableDataSource);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
}
