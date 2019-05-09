import { Component, OnInit } from '@angular/core';

declare var JSQR: any;

@Component({
  selector: 'app-qr-presenter',
  templateUrl: './qr-presenter.component.html',
  styleUrls: ['./qr-presenter.component.scss'],
})
export class QrPresenterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.generateQR("asdfgh");
  }


  private generateQR(value: string): void {

    var qr = new JSQR();

    var code = new qr.Code();
    code.encodeMode = code.ENCODE_MODE.UTF8_SIGNATURE;
    code.version = code.DEFAULT;
    code.errorCorrection = code.ERROR_CORRECTION.H;

    var input = new qr.Input();
    input.data = value;
    input.dataType = input.DATA_TYPE.TEXT;

    var matrix = new qr.Matrix(input, code);
    matrix.scale = 10;

    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', matrix.pixelWidth);
    canvas.setAttribute('height', matrix.pixelWidth);
    canvas.getContext('2d').fillStyle = 'rgb(0,0,0)';
    matrix.draw(canvas, 0, 0);
    document.getElementById("qrElement").appendChild(canvas);
  }

}
