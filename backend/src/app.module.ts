import { Module } from '@nestjs/common';
import { OcrSpaceService } from './services/ocr-space/ocr-space.service';
import { OcrController } from './controllers/ocr-space/ocr.controller';

@Module({
  imports: [],
  controllers: [
    OcrController,
  ],
  providers: [
    OcrSpaceService,
  ],
})
export class AppModule {
}
