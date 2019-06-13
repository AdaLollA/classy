import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrReaderService {

  private currentCanvas = null;

  private detectionEvent = new EventEmitter<boolean>();

  constructor() { }

  getCurrentCameraImage(): string {
    return this.currentCanvas.toDataURL('image/png;base64');
  }

  setCurrentCameraImage(canvas) {
    this.currentCanvas = canvas;
  }

  public qrCodeDetected() {
    this.detectionEvent.emit(true);
  }

  public getDetectionEvents(): EventEmitter<boolean> {
    return this.detectionEvent;
  }
}
