import { Test, TestingModule } from '@nestjs/testing';
import { OcrSpaceService } from './ocr-space.service';

describe('OcrSpaceService', () => {
  let service: OcrSpaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OcrSpaceService],
    }).compile();

    service = module.get<OcrSpaceService>(OcrSpaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
