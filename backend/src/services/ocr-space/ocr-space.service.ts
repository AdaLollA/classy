import { Injectable } from '@nestjs/common';
import { environment } from '../../environment/environment';
import { OcrResult } from './ocr-result';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';
import rp = require('request-promise');

// Results of the ocr-space API
// Doesn't need to be exposed since a custom type will be returned by this API.

export interface TextOverlay {
  Lines: any[];
  HasOverlay: boolean;
  Message: string;
}

export interface ParsedResult {
  TextOverlay: TextOverlay;
  TextOrientation: string;
  FileParseExitCode: number;
  ParsedText: string;
  ErrorMessage: string;
  ErrorDetails: string;
}

export interface OcrSpaceResponse {
  ParsedResults: ParsedResult[];
  OCRExitCode: number;
  IsErroredOnProcessing: boolean;
  ProcessingTimeInMilliseconds: string;
  SearchablePDFURL: string;
}

@Injectable()
export class OcrSpaceService {

  constructor() {
  }

  public getTextOfPicture(base64Img: string) {
    const options = {
      method: 'POST',
      url: `${ environment.ocrSpaceBaseUrl }/parse/image`,
      headers: {
        apikey: environment.ocrSpaceApiKey
      },
      formData: {
        language: 'ger',
        base64Image: base64Img
      },
      json: true
    };

    return fromPromise(rp(options)).pipe(
      map((ocrResponse: OcrSpaceResponse) => this.mapOcrSpaceResponse(ocrResponse))
    );
  }

  private mapOcrSpaceResponse(response: OcrSpaceResponse): OcrResult {
    let ocrResult: OcrResult;

    response.ParsedResults.forEach(parsedResult => {
      parsedResult.ParsedText.split(' \r\n').forEach((entry, index, entries) => {
        ocrResult = {
          campus: entries[3],
          name: entries[4],
          birthday: entries[5],
          nation: entries[6],
          studentId: entries[7]
        };
      });
    });

    return ocrResult;
  }

}
