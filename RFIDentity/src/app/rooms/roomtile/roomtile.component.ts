import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoomTableComponent } from '../roomtable/roomtable.component';
import { MatButtonModule } from '@angular/material/button';
import { RoomContent } from '../rooms.model';

@Component({
  selector: 'app-roomtile',
  standalone: true,
  imports: [RoomTableComponent, MatButtonModule],
  templateUrl: './roomtile.component.html',
  styleUrls: ['./roomtile.component.scss'],
})
export class RoomtileComponent {
  @Input({ required: true }) roomnum!: string;
  @Input({ required: true }) roomData!: RoomContent;

  constructor(private router: Router) {}

  onViewRoom(): void {
    this.router.navigate(['/rooms', this.roomnum]);
  }
}
