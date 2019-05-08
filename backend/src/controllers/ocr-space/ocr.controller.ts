import { Controller, Get, Post } from '@nestjs/common';
import { OcrResult } from '../../services/ocr-space/ocr-result';
import { OcrSpaceService } from '../../services/ocr-space/ocr-space.service';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ImageInput } from './image.input';

@Controller('ocr')
export class OcrController {

  constructor(private readonly ocrSpaceService: OcrSpaceService) {
  }

  @Get('hello')
  public getHello() {
    return { message: 'Hello World!' };
  }

  @Post('image')
  public async getTextOfImage(@Body() imageInput: ImageInput): Promise<OcrResult> {
    console.log(imageInput);
    return this.ocrSpaceService.getTextOfPicture(imageInput.base64Image).toPromise();
  }
}
