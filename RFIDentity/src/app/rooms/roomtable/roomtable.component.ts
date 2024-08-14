import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface Asset {
  AssetId: string;
  Description: string;
  Action: string;
  Status: string;
}

const ASSET_DATA: Asset[] = [
  {
    AssetId: 'A001',
    Description: 'Office Chair',
    Action: 'Repair',
    Status: 'OK',
  },
  { AssetId: 'A002', Description: 'Laptop', Action: 'Upgrade', Status: 'OK' },
  {
    AssetId: 'A003',
    Description: 'Projector',
    Action: 'Replace',
    Status: 'OK',
  },
  {
    AssetId: 'A004',
    Description: 'Desktop Computer',
    Action: 'Maintenance',
    Status: 'OK',
  },
  {
    AssetId: 'A005',
    Description: 'Air Conditioner',
    Action: 'Repair',
    Status: 'OK',
  },
  {
    AssetId: 'A006',
    Description: 'Printer',
    Action: 'Refill Ink',
    Status: 'OK',
  },
  {
    AssetId: 'A007',
    Description: 'Server Rack',
    Action: 'Upgrade',
    Status: 'OK',
  },
  {
    AssetId: 'A008',
    Description: 'Network Switch',
    Action: 'Replace',
    Status: 'OK',
  },
  {
    AssetId: 'A009',
    Description: 'CCTV Camera',
    Action: 'Maintenance',
    Status: 'OK',
  },
  {
    AssetId: 'A010',
    Description: 'Conference Table',
    Action: 'Repair',
    Status: 'OK',
  },
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-roomtable',
  styleUrl: 'roomtable.component.scss',
  templateUrl: 'roomtable.component.html',
  standalone: true,
  imports: [MatTableModule],
})
export class RoomTableComponent {
  displayedColumns: string[] = ['AssetId', 'Description', 'Action'];
  dataSource = ASSET_DATA;
}
