import { TestBed } from '@angular/core/testing';

import { EscolaDataService } from './escola-data.service';

describe('EscolaDataService', () => {
  let service: EscolaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscolaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
