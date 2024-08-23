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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { ApiResponse, Asset, Inventory } from './table.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionsComponent } from '../actions/actions.component';
import { MatSelectModule } from '@angular/material/select';
import { FetchTableDataService } from './fetch-table-data.service';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ActionsComponent,
    MatSelectModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnInit {
  isFetching = signal(false);
  dataSource = new MatTableDataSource<Asset>();
  filterValue = '';

  displayedColumns: string[] = [
    'assetId',
    'description',
    'vmLocation',
    'sapRoom',
    'status',
    'action',
  ];

  totalData?: number;

  pageSizes = [10, 15];

  inventoryList: Inventory[] = [{ id: 2, date: new Date('2019-01-16') }];
  currentInventory: number | null = null; // Initialize as null

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private router: Router, // Inject Router
    private tableDataService: FetchTableDataService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(ActionsComponent) actionsComponent!: ActionsComponent;

  onFinishHandler() {
    this.FetchTableData(0, 10);
  }

  // Update onSelectInventory to update the URL parameter
  onSelectInventory() {
    this.router.navigate([], {
      queryParams: { inventoryId: this.currentInventory },
      queryParamsHandling: 'merge',
    });
    this.FetchTableData(0, 10);
  }

  async FetchInventorys() {
    const subscription = this.httpClient
      .get<Inventory[]>('http://localhost:8080/api/inventory/getAllInventories')
      .subscribe({
        next: (resData) => {
          this.inventoryList = resData;
          if (!this.currentInventory && this.inventoryList.length > 0) {
            this.currentInventory = this.inventoryList[0].id;
            this.onSelectInventory(); // Update the URL with the first inventory if not set
          }
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  async FetchTableData(pageNumber: Number, pageSize: Number) {
    if (this.currentInventory === null) return; // Prevent fetching data if inventory is null

    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<ApiResponse>(
        `http://localhost:8080/api/inventory/getDashboard?page=${pageNumber}&size=${pageSize}&inventoryId=${this.currentInventory}`
      )
      .subscribe({
        next: (resData) => {
          this.dataSource.data = resData.content;
          console.log(resData.content);
        },
        complete: () => this.isFetching.set(false),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.currentInventory = +params['inventoryId'] || this.currentInventory;
      if (this.currentInventory) {
        this.FetchTableData(0, 10);
      }
    });

    await this.FetchInventorys();
  }

  onDeleteSearchValue() {
    this.filterValue = '';
    this.applyFilter(this.filterValue);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
