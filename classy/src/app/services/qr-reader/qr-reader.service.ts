import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrReaderService {

  private currentCanvas = null;

  constructor() { }

  getCurrentCameraImage(): string {
    return this.currentCanvas.toDataURL('image/png;base64');
  }

  setCurrentCameraImage(canvas) {
    this.currentCanvas = canvas;
  }
}
