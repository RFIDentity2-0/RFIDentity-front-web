import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asset, DetailAssets } from '../room-detail.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ActionDetailedRoomTableComponent } from './action-detailed-room-table/action-detailed-room-table.component';
@Component({
  selector: 'app-room-detailed-table',
  standalone: true,
  imports: [MatTableModule, ActionDetailedRoomTableComponent],
  templateUrl: './room-detailed-table.component.html',
  styleUrl: './room-detailed-table.component.scss',
})
export class RoomDetailedTableComponent implements OnInit {
  ngOnInit(): void {
    this.FetchDetails(0, 10, 1, this.room());
  }
  displayedColumns: string[] = [
    'assetId',
    'description',
    'status',
    'comment',
    'action',
  ];
  @ViewChild(ActionDetailedRoomTableComponent)
  actionsComponent!: ActionDetailedRoomTableComponent;

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
        `http://localhost:8080/api/locations/insideLocation?location=${roomNum}&page=0&size=10&sort=assetId`
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
  onFinishComment() {
    this.FetchDetails(0, 10, 1, this.room());
  }
}
