import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoomTableComponent } from '../roomtable/roomtable.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-roomtile',
  standalone: true,
  imports: [RoomTableComponent, MatButtonModule],
  templateUrl: './roomtile.component.html',
  styleUrls: ['./roomtile.component.scss'],
})
export class RoomtileComponent {
  @Input({ required: true }) roomnum!: string;

  constructor(private router: Router) {}

  onViewRoom(): void {
    this.router.navigate(['/rooms', this.roomnum]);
  }
}
