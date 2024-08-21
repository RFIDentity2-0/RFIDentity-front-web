import { Component, input } from '@angular/core';
import { Asset } from '../table/table.model';
@Component({
  selector: 'app-room-detailed-table',
  standalone: true,
  imports: [],
  templateUrl: './room-detailed-table.component.html',
  styleUrl: './room-detailed-table.component.scss',
})
export class RoomDetailedTableComponent {
  room = input.required<string>();
}
