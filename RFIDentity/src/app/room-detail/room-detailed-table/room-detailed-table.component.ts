import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asset, DetailAssets } from '../room-detail.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-room-detailed-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './room-detailed-table.component.html',
  styleUrl: './room-detailed-table.component.scss',
})
export class RoomDetailedTableComponent implements OnInit {
  ngOnInit(): void {
    this.FetchDetails();
  }
  displayedColumns: string[] = [
    'assetId',
    'description',
    'hardwareType',
    'type',
    'status',
    'action',
  ];

  room = input.required<string>();
  dataSource = new MatTableDataSource<Asset>();
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  async FetchDetails(
    pageNumber?: number,
    pageSize?: number,
    inventoryId?: number,
    roomNum?: string
  ) {
    const subscription = this.httpClient
      .get<DetailAssets>(
        `http://localhost:8080/api/inventory/getAssetsForRoom/1/IT%20DC?page=0&size=10`
      )
      .subscribe({
        next: (resData) => {
          this.dataSource.data = resData.content;
          console.log(resData.content);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
