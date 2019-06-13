import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QrReaderService } from '../../services/qr-reader/qr-reader.service';
import jsQR from 'jsqr';

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss'],
})
export class QrReaderComponent implements OnInit {
  @Input('outline')
  outline = '#FF3B58';

  @Input('stopWhenRead')
  stopWhenRead = false;

  @Input('disabled')
  disabled = false;

  @Input('stopScanning')
  stopScanning = false;

  @Output('readQr')
  readQr: EventEmitter<string> = new EventEmitter();

  private video;
  private canvasElement;
  private canvas;

  constructor(private qrReaderService: QrReaderService) {
  }

  ngOnInit() {
    // Init ui elements
    this.video = document.createElement('video');
    this.canvasElement = document.getElementById('canvas') as any;
    this.canvas = this.canvasElement.getContext('2d');

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
      this.video.srcObject = stream;
      this.video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
      this.video.play().then(/*do nothing*/);
      requestAnimationFrame(() => {
        this.tick();
      });
    });
  }

  private drawLine(begin, end, color) {
    this.canvas.beginPath();
    this.canvas.moveTo(begin.x, begin.y);
    this.canvas.lineTo(end.x, end.y);
    this.canvas.lineWidth = 4;
    this.canvas.strokeStyle = color;
    this.canvas.stroke();
  }

  private tick() {
    let foundQr = false;
    if ( this.video.readyState === this.video.HAVE_ENOUGH_DATA ) {
      if ( !this.disabled ) {
        this.canvasElement.hidden = false;

        this.canvasElement.height = this.video.videoHeight;
        this.canvasElement.width = this.video.videoWidth;
        this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
        const imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.qrReaderService.setCurrentCameraImage(this.canvasElement);

        if ( !this.stopScanning ) {
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });
          if ( code ) {
            this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, this.outline);
            this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, this.outline);
            this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, this.outline);
            this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, this.outline);
            this.readQr.emit(code.data);
            foundQr = true;
          } else {
            // no qr found at the moment
          }
        }
      }
    }

    if ( !(foundQr && this.stopWhenRead) ) {
      requestAnimationFrame(() => {
        this.tick();
      });
    }
  }
}
