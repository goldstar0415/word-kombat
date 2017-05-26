import { TestBed, inject } from '@angular/core/testing';

import { NetworkHealthService } from './network-health.service';

describe('NetworkHealthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkHealthService]
    });
  });

  it('should ...', inject([NetworkHealthService], (service: NetworkHealthService) => {
    expect(service).toBeTruthy();
  }));
});
