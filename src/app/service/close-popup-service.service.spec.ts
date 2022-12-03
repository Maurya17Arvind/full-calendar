import { TestBed } from '@angular/core/testing';

import { ClosePopupServiceService } from './close-popup-service.service';

describe('ClosePopupServiceService', () => {
  let service: ClosePopupServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClosePopupServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
