import { Test, TestingModule } from '@nestjs/testing';
import { OcrController } from './ocr.controller';

describe('OcrSpace Controller', () => {
  let controller: OcrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OcrController],
    }).compile();

    controller = module.get<OcrController>(OcrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
