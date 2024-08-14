import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { Asset, RoomAssets, RoomSelection } from './rooms.model';
import { RoomtileComponent } from './roomtile/roomtile.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
// Create sample assets
const ROOMS = [
  {
    room: 'room1',
  },
  {
    room: 'room2',
  },
  {
    room: 'room3',
  },
  {
    room: 'room4',
  },
  {
    room: 'room5',
  },
  {
    room: 'room6',
  },
  {
    room: 'room7',
  },
];

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RoomtileComponent, MatCheckboxModule, FormsModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
  // Create sample room assets
  rooms = ROOMS;

  // ----------------------------checkbox logic---------------------------
  readonly room = signal<RoomSelection>({
    name: 'Parent room',
    completed: false,
    subroom: [
      { name: 'Child room 1', completed: false },
      { name: 'Child room 2', completed: false },
      { name: 'Child room 3', completed: false },
    ],
  });

  readonly partiallyComplete = computed(() => {
    const room = this.room();
    if (!room.subroom) {
      return false;
    }
    return (
      room.subroom.some((t) => t.completed) &&
      !room.subroom.every((t) => t.completed)
    );
  });

  update(completed: boolean, index?: number) {
    this.room.update((room) => {
      if (index === undefined) {
        room.completed = completed;
        room.subroom?.forEach((t) => (t.completed = completed));
      } else {
        room.subroom![index].completed = completed;
        room.completed = room.subroom?.every((t) => t.completed) ?? true;
      }
      return { ...room };
    });
  }

  // ---------------------------------------------------------------------
}
