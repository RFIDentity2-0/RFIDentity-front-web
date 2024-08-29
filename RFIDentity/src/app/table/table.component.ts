import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiResponse, Asset, Inventory } from './table.model';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionsComponent } from './actions/actions.component';
import { MatSelectModule } from '@angular/material/select';
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
    'location',
    'sapRoom',
    'itemStatus',
    'action',
  ];

  // Pagination variables
  pageSizes = [10, 20, 30];
  totalItems = 0; // Total number of items in the backend
  pageIndex = 0; // Current page index
  pageSize = this.pageSizes[0]; // Default page size

  // Sorting
  sortStatus = 'itemStatus,asc';

  // Filtering
  filterDescription = '';

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  @ViewChild(ActionsComponent) actionsComponent!: ActionsComponent;

  onFinishHandler() {
    this.FetchTableData(this.pageIndex, this.pageSize);
  }

  async FetchTableData(
    pageNumber: number,
    pageSize: number,
    sort: string = 'itemStatus,asc',
    locationfilter?: string
  ) {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<ApiResponse>(
        `http://localhost:8080/api/dashboard/list?&description=${this.filterDescription}&page=${pageNumber}&size=${pageSize}&sort=${sort}`
      )
      .subscribe({
        next: (resData) => {
          this.dataSource.data = resData.content;
          this.totalItems = resData.totalElements; // Update totalItems from API response
          console.log(resData);
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

  async onSortStatusClick() {
    if (this.sortStatus === 'itemStatus,asc') {
      this.sortStatus = 'itemStatus,desc';
    } else {
      this.sortStatus = 'itemStatus,asc';
    }
    console.log(this.sortStatus);
    this.FetchTableData(this.pageIndex, this.pageSize, this.sortStatus);
  }

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

  onFilterChange() {
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
