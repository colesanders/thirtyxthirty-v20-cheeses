import { TestBed } from '@angular/core/testing';

import { CheesesService } from './cheeses.service';

describe('CheesesService', () => {
  let service: CheesesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheesesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
