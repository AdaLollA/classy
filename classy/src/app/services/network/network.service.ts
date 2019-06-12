import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserData } from 'src/app/components/tongue/tongue.component';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private httpClient: HttpClient) { }

  login(imgDataUrl: string): Observable<IUserData> {
    return this.httpClient.post<IUserData>("https://hseukd0qwg.execute-api.us-east-1.amazonaws.com/dev/ocr", {
      base64Image: imgDataUrl
    });
  }

}
