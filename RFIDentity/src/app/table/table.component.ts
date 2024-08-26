import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiResponse, Asset, Inventory } from './table.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionsComponent } from './actions/actions.component';
import { MatSelectModule } from '@angular/material/select';
import { FetchTableDataService } from './fetch-table-data.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ActionsComponent,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnInit {
  isFetching = signal(false);
  dataSource = new MatTableDataSource<Asset>();

  displayedColumns: string[] = [
    'assetId',
    'description',
    'vmLocation',
    'sapRoom',
    'itemStatus',
    'action',
  ];

  // Pagination variables
  pageSizes = [5, 10, 15];
  totalItems = 0; // Total number of items in the backend
  pageIndex = 0; // Current page index
  pageSize = this.pageSizes[0]; // Default page size

  // Inventory
  inventoryList: Inventory[] = [{ id: 1, date: new Date('2019-01-16') }];
  currentInventory = this.inventoryList[0].id;

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private inventoryService: InventoryService,
    private tableDataService: FetchTableDataService
  ) {}

  @ViewChild(ActionsComponent) actionsComponent!: ActionsComponent;

  onFinishHandler() {
    this.FetchTableData(this.pageIndex, this.pageSize);
  }

  async FetchTableData(pageNumber: number, pageSize: number) {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<ApiResponse>(
        `http://localhost:8080/api/dashboard/list?page=${pageNumber}&size=${pageSize}&sort=status`
      )
      .subscribe({
        next: (resData) => {
          this.dataSource.data = resData.content;
          this.totalItems = 10; // Update totalItems from API response
          console.log(resData.content);
        },
        complete: () => this.isFetching.set(false),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.FetchTableData(0, this.pageSize);
  }

  ngAfterViewInit() {}

  // Custom pagination logic
  onNextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.totalItems) {
      this.pageIndex++;
      this.FetchTableData(this.pageIndex, this.pageSize);
    }
  }

  onPreviousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.FetchTableData(this.pageIndex, this.pageSize);
    }
  }

  onPageSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = Number(selectElement.value);
    this.pageIndex = 0; // Reset to first page
    this.FetchTableData(this.pageIndex, this.pageSize);
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
