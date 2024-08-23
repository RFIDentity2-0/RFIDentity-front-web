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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { ApiResponse, Asset, Inventory } from './table.model';
// import { assets } from './DummyAssets';
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
  styleUrl: './table.component.scss',
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
  // Backend side pagination
  totalData?: number;

  pageSizes = [5, 10, 15];

  // Inventory
  inventoryList: Inventory[] = [{ id: 2, date: new Date('2019-01-16') }];
  currentInventory = this.inventoryList[0].id;

  // getCurrentInventory(): void {
  //   this.currentInventory = this.inventoryService.getCurrentInventory();
  // }
  testVariable: number | null = 0;

  getCurrentInventory(): void {
    this.currentInventory = this.inventoryService.getCurrentInventory();
  }
  //
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private inventoryService: InventoryService,
    private tableDataService: FetchTableDataService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(ActionsComponent) actionsComponent!: ActionsComponent;

  // actions function

  onFinishHandler() {
    this.FetchTableData(0, 10);
  }

  onSelectInventory() {
    this.inventoryService.setCurrentInventory(this.currentInventory);
    this.getCurrentInventory();

    this.FetchTableData(0, 10);
  }
  async FetchInventorys() {
    const subscription = this.httpClient
      .get<Inventory[]>('http://localhost:8080/api/inventory/getAllInventories')
      .subscribe({
        next: (resData) => {
          this.inventoryList = resData;
          console.log(this.inventoryList);
          console.log(this.currentInventory);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  async FetchTableData(pageNumber: Number, pageSize: Number) {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<ApiResponse>(
        `http://localhost:8080/api/inventory/getDashboard?page=${pageNumber}&size=${pageSize}&inventoryId=${this.currentInventory}`
      )

      .subscribe({
        next: (resData) => {
          this.dataSource.data = resData.content; // Assign the response data directly to the dataSource

          console.log(resData.content);
        },
        complete: () => this.isFetching.set(false),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  async ngOnInit() {
    await this.FetchInventorys();

    this.inventoryService.setCurrentInventory(this.currentInventory);
    this.getCurrentInventory();
    this.FetchTableData(0, 10);
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
    // console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
