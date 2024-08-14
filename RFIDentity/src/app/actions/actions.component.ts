import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SAP_Asset, VM_Asset } from './actions.mode';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
})
export class ActionsComponent {
  isFetching = signal(false);

  dataSource = <SAP_Asset>{
    AssetId: 'temp',
    Description: 'temp',
    Room: 'temp',
  };

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  onToggleOverlayClick() {
    this.fetchData();
    this.toggleOverlay();
  }

  // Data fetching for actions tab
  async fetchData() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<SAP_Asset[]>(
        'https://66b4810f9f9169621ea33918.mockapi.io/rfid/SAP_Asset'
      )
      .subscribe({
        next: (resData) => {
          this.dataSource = resData[0];
          console.log(resData);
        },
        complete: () => this.isFetching.set(false),
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  // Asset values
  @Input({ required: true }) AssetId!: string;
  AssetIdvalue = 'temp';
  Descriptionvalue = 'temp';
  RoomValue = 'temp';

  // Overlay settings
  isOverlayVisible = false;

  @ViewChild('overlayContent') overlayContent!: ElementRef;

  toggleOverlay() {
    this.isOverlayVisible = !this.isOverlayVisible;
  }

  onOverlayClick(event: MouseEvent) {
    // Check if the click was outside the overlay content
    if (!this.overlayContent.nativeElement.contains(event.target)) {
      this.isOverlayVisible = false;
    }
  }
}
