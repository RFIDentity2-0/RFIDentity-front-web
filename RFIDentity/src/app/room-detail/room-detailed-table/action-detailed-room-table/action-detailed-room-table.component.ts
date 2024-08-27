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
  @Input({ required: true }) assetId!: string;
  @Output() finishEvent = new EventEmitter<void>();

  // Overlay settings
  isOverlayVisible = false;

  @ViewChild('overlayContent') overlayContent!: ElementRef;

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  async submitSapData(assetId: string, comment: string) {
    console.log('SUBMITTING COMMENT');
    const commentobj = {
      comment: comment,
    };
    try {
      // API call to update SAP item
      await this.httpClient
        .put(
          `http://localhost:8080/api/locations/comment?assetId=${assetId}`,
          commentobj,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        )
        .toPromise();
      console.log('Data successfully submitted.');
      this.message = 'Data succesfully submitted.';
    } catch (error) {
      console.error('Error submitting data', error);
      this.message = 'Error submiting data.';
    } finally {
      // this.toggleOverlay(); // Hide overlay after submission
    }
  }

  toggleOverlay() {
    this.isOverlayVisible = !this.isOverlayVisible;
  }
  async onFinish() {
    console.log(this.comment);
    await this.submitSapData(this.assetId, this.comment);
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
