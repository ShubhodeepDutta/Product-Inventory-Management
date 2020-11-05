import { TestBed } from '@angular/core/testing';

import { ExitGuardService } from './exit-guard.service';

describe('ExitGuardService', () => {
  let service: ExitGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExitGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
