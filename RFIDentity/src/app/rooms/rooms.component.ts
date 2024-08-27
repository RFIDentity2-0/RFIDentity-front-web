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
        `http://localhost:8080/api/locations/locationsToRoomsPage?page=0&size=5&sort=`
      )
      .subscribe({
        next: (resData) => {
          this.datasource = resData;
        },
        complete: () => this.isFetching.set(false),
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

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
}
