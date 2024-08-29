import {
  Component,
  inject,
  OnInit,
  signal,
  computed,
  DestroyRef,
} from '@angular/core';
import {
  RoomContent,
  DataStructure,
  RoomSelection,
} from './rooms.model';
import { RoomtileComponent } from './roomtile/roomtile.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  rooms?: RoomContent[];
  datasource?: DataStructure;
  isFetching = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  readonly room = signal<RoomSelection>({
    name: 'Select All',
    selected: true, // Set default to true
    subroom: [],
  });

  ngOnInit() {
    this.fetchRoomData();
  }

  async fetchRoomData(page?: number, size?: number) {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<DataStructure>(
        `http://localhost:8080/api/locations/locationsToRoomsPage?page=${page}&size=${size}&sort=`
      )
      .subscribe({
        next: (resData) => {
          this.datasource = resData;
          this.room.update((room) => ({
            ...room,
            subroom: resData.content.map((roomContent) => ({
              name: roomContent.location,
              selected: true, // Set default to true
            })),
          }));
        },
        complete: () => this.isFetching.set(false),
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

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

  get filteredRooms() {
    const selectedRooms = this.room().subroom?.filter(subroom => subroom.selected).map(subroom => subroom.name);
    return this.datasource?.content.filter(room => selectedRooms?.includes(room.location));
  }
}
