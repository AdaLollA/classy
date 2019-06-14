import { Component, OnInit } from '@angular/core';

declare var JSQR: any;

@Component({
  selector: 'app-qr-presenter',
  templateUrl: './qr-presenter.component.html',
  styleUrls: ['./qr-presenter.component.scss'],
})
export class QrPresenterComponent implements OnInit {

  constructor() { }

  private qrSize = 10;

  private qrMatrix: any = null;

  private qrContainer: HTMLElement;

  ngOnInit() {
    this.qrContainer = document.getElementById('qrElement');
    this.generateQR('asdfgh');
  }

  private generateQR(value: string): void {

    const qr = new JSQR();

    const code = new qr.Code();
    code.encodeMode = code.ENCODE_MODE.UTF8_SIGNATURE;
    code.version = code.DEFAULT;
    code.errorCorrection = code.ERROR_CORRECTION.H;

    const input = new qr.Input();
    input.data = value;
    input.dataType = input.DATA_TYPE.TEXT;

    const matrix = new qr.Matrix(input, code);
    this.qrMatrix = matrix;
    this.resizeQr(this.qrSize);
  }

  public resizeQr(value: number) {
    this.qrSize = value;
    if (!!this.qrMatrix) {
      this.qrMatrix.scale = this.qrSize;
      this.qrMatrix.margin = 0;

      const canvas = document.createElement('canvas');
      canvas.setAttribute('width', this.qrMatrix.pixelWidth);
      canvas.setAttribute('height', this.qrMatrix.pixelWidth);
      canvas.getContext('2d').fillStyle = 'rgb(0,0,0)';
      this.qrMatrix.draw(canvas, 0, 0);
      while (this.qrContainer.hasChildNodes()) {
        this.qrContainer.firstChild.remove();
      }
      this.qrContainer.appendChild(canvas);
    }
  }

}
