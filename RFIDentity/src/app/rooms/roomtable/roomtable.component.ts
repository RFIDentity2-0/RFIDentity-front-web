import { Component, Input, input, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Asset, RoomContent } from '../rooms.model';
import { CommonModule } from '@angular/common';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-roomtable',
  styleUrl: 'roomtable.component.scss',
  templateUrl: 'roomtable.component.html',
  standalone: true,
  imports: [MatTableModule, CommonModule],
})
export class RoomTableComponent {
  @Input({ required: true }) dataSource!: RoomContent;

  displayedColumns: string[] = ['assetId', 'description'];
}
