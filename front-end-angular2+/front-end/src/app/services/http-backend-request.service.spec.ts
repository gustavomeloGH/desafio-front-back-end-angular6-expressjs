import { TestBed, inject } from '@angular/core/testing';

import { HttpBackendRequestService } from './http-backend-request.service';

describe('HttpBackendRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpBackendRequestService]
    });
  });

  it('should be created', inject([HttpBackendRequestService], (service: HttpBackendRequestService) => {
    expect(service).toBeTruthy();
  }));
});
