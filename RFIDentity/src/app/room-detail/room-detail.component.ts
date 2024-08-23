import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from '../table/table.component';
import { RoomDetailedTableComponent } from '../room-detailed-table/room-detailed-table.component';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Asset, DetailAssets } from './room-detail.model';
@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [TableComponent, RoomDetailedTableComponent],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.scss',
})
export class RoomDetailComponent implements OnInit {
  roomnum!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the room number from the route parameters
    this.roomnum = this.route.snapshot.paramMap.get('roomnum') || '';
    // this.FetchDetails();
  }
}
