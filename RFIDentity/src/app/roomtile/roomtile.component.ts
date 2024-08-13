import { Component, Input } from '@angular/core';
import { RoomTableComponent } from '../roomtable/roomtable.component';
@Component({
  selector: 'app-roomtile',
  standalone: true,
  imports: [RoomTableComponent],
  templateUrl: './roomtile.component.html',
  styleUrl: './roomtile.component.scss',
})
export class RoomtileComponent {
  @Input({ required: true }) roomnum!: string;
}
