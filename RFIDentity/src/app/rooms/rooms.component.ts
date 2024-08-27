import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  RoomContent,
  DataStructure,
  Asset,
  RoomSelection,
} from './rooms.model';
import { RoomtileComponent } from './roomtile/roomtile.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { InventoryService } from '../services/inventory.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
// Create sample assets

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    RoomtileComponent,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent implements OnInit {
  rooms?: RoomContent[];
  datasource?: DataStructure;
  isFetching = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  // Inventory service Implementantion
  constructor(private inventoryService: InventoryService) {}

  currentInventory?: number;
  getCurrentInventory(): void {
    this.currentInventory = this.inventoryService.getCurrentInventory();
  }
  ngOnInit() {
    this.getCurrentInventory();
    this.fetchRoomData(this.currentInventory);
  }
  // Create sample room assets

  async fetchRoomData(inventoryId?: Number, page?: Number, size?: Number) {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<DataStructure>(
        `http://localhost:8080/api/locations/locationsToRoomsPage?page=${page}&size=${size}&sort=`
      )
      .subscribe({
        next: (resData) => {
          this.datasource = resData;
          this.totalItems = resData.totalElements;
        },
        complete: () => this.isFetching.set(false),
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  // Pagination variables
  pageSizes = [1, 2, 5, 10, 15];
  totalItems = 0;
  pageIndex = 0;
  pageSize = this.pageSizes[0];

  // ----------------------------checkbox logic---------------------------
  readonly room = signal<RoomSelection>({
    name: 'Select All',
    selected: false,
    subroom: [
      { name: 'room1', selected: false },
      { name: 'room2', selected: false },
      { name: 'room3', selected: false },
    ],
  });

  readonly partiallyComplete = computed(() => {
    const room = this.room();
    if (!room.subroom) {
      return false;
    }
    return (
      room.subroom.some((t) => t.selected) &&
      !room.subroom.every((t) => t.selected)
    );
  });

  update(selected: boolean, index?: number) {
    this.room.update((room) => {
      if (index === undefined) {
        room.selected = selected;
        room.subroom?.forEach((t) => (t.selected = selected));
      } else {
        room.subroom![index].selected = selected;
        room.selected = room.subroom?.every((t) => t.selected) ?? true;
      }
      return { ...room };
    });
  }

  // ---------------------------------------------------------------------

  // Pagination logic
  // Custom pagination logic
  onNextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.totalItems) {
      this.pageIndex++;
      this.fetchRoomData(this.pageIndex, this.pageSize);
    }
  }

  onPreviousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.fetchRoomData(this.pageIndex, this.pageSize);
    }
  }

  onPageSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = Number(selectElement.value);
    this.pageIndex = 0; // Reset to first page
    this.fetchRoomData(this.pageIndex, this.pageSize);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  canGoNext(): boolean {
    return (this.pageIndex + 1) * this.pageSize < this.totalItems;
  }

  canGoPrevious(): boolean {
    return this.pageIndex > 0;
  }
}
