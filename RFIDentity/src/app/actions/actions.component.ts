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
import { ActionsApiResponse } from './actions.mode';
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
  messageSAP = '';
  messageVM = '';
  dataSource = <ActionsApiResponse>{
    assetId: 'string',
    description: 'string',
    sapRoom: 'string',
    systemName: 'string',
    dnsName: 'string',
    type: 'string',
    manufacturer: 'string',
    hardwareType: 'string',
    serialNo: 'string',
    status: 'string',
    department: 'string',
  };

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  onToggleOverlayClick() {
    if (this.isOverlayVisible) {
      this.finishEvent.emit();
    } else if (!this.isOverlayVisible) {
      this.fetchData();
      this.toggleOverlay();
    }
  }

  onFinish() {
    this.finishEvent.emit();
    this.toggleOverlay();
  }
  // Data fetching for actions tab
  async fetchData() {
    console.log(
      `fetching actions INVENTORYID: ${this.InventoryId} ASSETID: ${this.AssetId}`
    );
    this.isFetching.set(true);
    console.log(
      `address of fetching: http://localhost:8080/api/inventory/getDiff/${this.InventoryId}/${this.AssetId}}`
    );
    const subscription = this.httpClient
      .get<ActionsApiResponse>(
        `http://localhost:8080/api/inventory/getDiff/${this.InventoryId}/${this.AssetId}`,
        {
          headers: {
            Accept: 'application/hal+json',
          },
        }
      )
      .subscribe({
        next: (resData) => {
          this.dataSource = resData;
          console.log(resData);
        },
        complete: () => this.isFetching.set(false),
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  // Method to submit form data

  async submitSapData() {
    this.isFetching.set(true);
    const sapItemData = {
      description: this.dataSource.description,
      room: this.dataSource.sapRoom,
    };
    try {
      // API call to update SAP item
      await this.httpClient
        .put(
          `http://localhost:8080/api/sapItem/updateSapItem/${this.InventoryId}/${this.AssetId}`,
          sapItemData,
          {
            headers: {
              Accept: 'application/hal+json',
              'Content-Type': 'application/json',
            },
          }
        )
        .toPromise();
      console.log('Data successfully submitted.');
      this.messageSAP = 'Data succesfully submitted.';
    } catch (error) {
      console.error('Error submitting data', error);
      this.messageSAP = 'Error submiting data.';
    } finally {
      this.isFetching.set(false);
      // this.toggleOverlay(); // Hide overlay after submission
    }
  }
  async submitVMData() {
    this.isFetching.set(true);

    const vmItemData = {
      systemName: this.dataSource.systemName,
      dnsName: this.dataSource.dnsName,
      type: this.dataSource.type,
      manufacturer: this.dataSource.manufacturer,
      hardwareType: this.dataSource.hardwareType,
      serialNo: this.dataSource.serialNo,
      status: this.dataSource.status,
      department: this.dataSource.department,
    };

    try {
      // API call to update VM item
      await this.httpClient
        .put(
          `http://localhost:8080/api/vmItem/updateVmItem/${this.InventoryId}/${this.AssetId}`,
          vmItemData,
          {
            headers: {
              Accept: 'application/hal+json',
              'Content-Type': 'application/json',
            },
          }
        )
        .toPromise();

      console.log('Data successfully submitted.');
      this.messageVM = 'Data successfully submitted.';
    } catch (error) {
      console.error('Error submitting data', error);
      this.messageVM = 'Error submiting data.';
    } finally {
      this.isFetching.set(false);
      // this.toggleOverlay(); // Hide overlay after submission
    }
  }

  // Asset values
  @Input({ required: true }) AssetId!: string;
  @Input({ required: true }) InventoryId!: number;
  @Output() finishEvent = new EventEmitter<void>();

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
