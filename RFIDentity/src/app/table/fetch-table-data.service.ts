// fetch-table-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './table.model';

@Injectable({
  providedIn: 'root',
})
export class FetchTableDataService {
  constructor(private http: HttpClient) {}

  public getDashboardTableData(
    pageNumber: Number,
    pageSize: Number,
    inventoryId: Number
  ): Observable<ApiResponse> {
    const url = `http://localhost:8080/api/inventory/getDashboard?page=${pageNumber}&size=${pageSize}&inventoryId=${inventoryId}`;
    return this.http.get<ApiResponse>(url);
  }
}
