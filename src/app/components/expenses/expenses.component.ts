import { Component } from '@angular/core';
import { PageHeaderComponent } from "../ui/page-header/page-header.component";

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    PageHeaderComponent
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {

}
