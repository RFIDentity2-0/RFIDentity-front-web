import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-action-detailed-room-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './action-detailed-room-table.component.html',
  styleUrl: './action-detailed-room-table.component.scss',
})
export class ActionDetailedRoomTableComponent {
  message = '';
  onToggleOverlayClick() {
    if (this.isOverlayVisible) {
      this.finishEvent.emit();
    } else if (!this.isOverlayVisible) {
      this.toggleOverlay();
    }
  }
  // @Input({ required: true }) AssetId!: string;
  // @Input({ required: true }) InventoryId!: number | null;
  @Input({ required: true }) comment!: string;
  @Output() finishEvent = new EventEmitter<void>();

  // Overlay settings
  isOverlayVisible = false;

  @ViewChild('overlayContent') overlayContent!: ElementRef;

  toggleOverlay() {
    this.isOverlayVisible = !this.isOverlayVisible;
  }
  onFinish() {
    this.finishEvent.emit();
    this.toggleOverlay();
  }
  onOverlayClick(event: MouseEvent) {
    // Check if the click was outside the overlay content
    if (!this.overlayContent.nativeElement.contains(event.target)) {
      this.isOverlayVisible = false;
    }
  }
}
