import { TestBed } from '@angular/core/testing';

import { QrReaderService } from './qr-reader.service';

describe('QrReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrReaderService = TestBed.get(QrReaderService);
    expect(service).toBeTruthy();
  });
});
