import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @Input() page!: string;

  @Input() showNewButton!: boolean;

  @Output() onNewClicked = new EventEmitter();
}
