import { TestBed } from '@angular/core/testing';
import { FetchTableDataService } from './fetch-table-data.service';

describe('FetchTableDataService', () => {
  let service: FetchTableDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchTableDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
