import { TestBed } from '@angular/core/testing';

import { GlobalParamServiceService } from './global-param-service.service';

describe('GlobalParamServiceService', () => {
  let service: GlobalParamServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalParamServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
