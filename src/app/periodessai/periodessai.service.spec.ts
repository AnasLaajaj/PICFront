import { TestBed } from '@angular/core/testing';

import { PeriodessaiService } from './periodessai.service';

describe('PeriodessaiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeriodessaiService = TestBed.get(PeriodessaiService);
    expect(service).toBeTruthy();
  });
});
