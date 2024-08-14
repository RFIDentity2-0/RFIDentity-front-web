import { Component, Input } from '@angular/core';
import { RoomTableComponent } from '../roomtable/roomtable.component';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-roomtile',
  standalone: true,
  imports: [RoomTableComponent, MatButtonModule],
  templateUrl: './roomtile.component.html',
  styleUrl: './roomtile.component.scss',
})
export class RoomtileComponent {
  @Input({ required: true }) roomnum!: string;
}
