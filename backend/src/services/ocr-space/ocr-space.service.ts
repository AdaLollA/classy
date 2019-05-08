import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { environment } from '../../environment/environment';
import { OcrResult } from './ocr-result';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, map } from 'rxjs/operators';

// Results of the ocr-space API
// Donn't need to be exposed since a custom type will be returned by this API.
interface Word {
  WordText: string;
  Left: number;
  Top: number;
  Height: number;
  Width: number;
}

interface Line {
  Words: Word[];
  MaxHeight: number;
  MinTop: number;
}

interface TextOverlay {
  Lines: Line[];
  HasOverlay: boolean;
  Message?: any;
}

interface ParsedResult {
  TextOverlay: TextOverlay;
  FileParseExitCode: any;
  ParsedText: string;
  ErrorMessage: string;
  ErrorDetails: string;
}

interface OcrSpaceResponse {
  ParsedResults: ParsedResult[];
  OCRExitCode: string;
  IsErroredOnProcessing: boolean;
  ErrorMessage?: any;
  ErrorDetails?: any;
  SearchablePDFURL: string;
  ProcessingTimeInMilliseconds: string;
}

@Injectable()
export class OcrSpaceService {

  constructor() {
  }

  public getTextOfPicture(base64Img: string): Observable<OcrResult> {
    // Configuration for the POST request to ocr.space
    const requestConfig: AxiosRequestConfig = {
      method: 'post',
      baseURL: environment.ocrSpaceBaseUrl,
      url: '',
      headers: {
        apikey: environment.ocrSpaceApiKey
      },
      data: {
        language: 'eng',
        isOverlayRequired: false,
        base64Image: base64Img
      },
      validateStatus: (status: number) => status >= 200 && status < 300
    };

    return fromPromise(axios(requestConfig))
      .pipe(
        map((response: AxiosResponse<OcrSpaceResponse>) => this.mapOcrSpaceResponse(response.data)),
        catchError((err, caught) => {
          console.error(err);
          return caught;
        })
      );
  }

  private mapOcrSpaceResponse(response: OcrSpaceResponse): OcrResult {
    const ocrResult: OcrResult = { parsedResults: [] };

    console.log(JSON.stringify(response));

    response.ParsedResults.forEach(parsedResult => {
      ocrResult.parsedResults.push(parsedResult.ParsedText);
    });

    return ocrResult;
  }

}
