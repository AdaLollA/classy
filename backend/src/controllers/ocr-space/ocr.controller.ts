import { Controller, Post } from '@nestjs/common';
import { OcrResult } from '../../services/ocr-space/ocr-result';
import { OcrSpaceService } from '../../services/ocr-space/ocr-space.service';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ImageInput } from './image.input';

@Controller('ocr')
export class OcrController {

  constructor(private readonly ocrSpaceService: OcrSpaceService) {
  }

  @Post('')
  public async getTextFromImage(@Body() imageInput: ImageInput): Promise<OcrResult> {
    return this.ocrSpaceService.getTextOfPicture(imageInput.base64Image).toPromise();
  }

}
