import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
  signal,
} from '@angular/core';
import { RoomSelection } from './rooms.model';
import { RoomtileComponent } from './roomtile/roomtile.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { InventoryService } from '../services/inventory.service';
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
  imports: [
    RoomtileComponent,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent implements OnInit {
  // Service Implementantion
  constructor(private inventoryService: InventoryService) {}
  currentInventory = 0;
  getCurrentInventory(): void {
    this.currentInventory = this.inventoryService.getCurrentInventory();
  }
  ngOnInit() {
    this.getCurrentInventory();
  }
  // Create sample room assets
  rooms = ROOMS;

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
