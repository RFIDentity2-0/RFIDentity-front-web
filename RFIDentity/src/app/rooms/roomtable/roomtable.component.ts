import { Component, Input, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Asset, RoomContent } from '../rooms.model';



/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-roomtable',
  styleUrl: 'roomtable.component.scss',
  templateUrl: 'roomtable.component.html',
  standalone: true,
  imports: [MatTableModule],
})
export class RoomTableComponent {
  @Input({required: true}) dataSource!:RoomContent;
  displayedColumns: string[] = ['assetId', 'description', 'action'];
}
