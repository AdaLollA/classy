import {Component, OnInit} from '@angular/core';
import jsQR from 'jsqr';

@Component({
    selector: 'app-qr-reader',
    templateUrl: './qr-reader.component.html',
    styleUrls: ['./qr-reader.component.scss'],
})
export class QrReaderComponent implements OnInit {
    private video;
    private canvasElement;
    private canvas;
    private loadingMessage;
    private outputContainer;
    private outputMessage;
    private outputData;

    ngOnInit() {
        // Init ui elements
        this.video = document.createElement('video');
        this.canvasElement = document.getElementById('canvas') as any;
        this.canvas = this.canvasElement.getContext('2d');
        this.loadingMessage = document.getElementById('loadingMessage');
        this.outputContainer = document.getElementById('output');
        this.outputMessage = document.getElementById('outputMessage');
        this.outputData = document.getElementById('outputData');

        // Use facingMode: environment to attemt to get the front camera on phones
        navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}}).then((stream) => {
            this.video.srcObject = stream;
            this.video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
            this.video.play();
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
        this.loadingMessage.innerText = '⌛ Loading video...';
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.loadingMessage.hidden = true;
            this.canvasElement.hidden = false;
            this.outputContainer.hidden = false;

            this.canvasElement.height = this.video.videoHeight;
            this.canvasElement.width = this.video.videoWidth;
            this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
            let imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
            let code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert',
            });
            if (code) {
                this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
                this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
                this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
                this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
                this.outputMessage.hidden = true;
                this.outputData.parentElement.hidden = false;
                this.outputData.innerText = code.data;
            } else {
                this.outputMessage.hidden = false;
                this.outputData.parentElement.hidden = true;
            }
        }
        requestAnimationFrame(() => {
            this.tick();
        });
    }

    /*
      var video = document.createElement("video");
      var canvasElement = document.getElementById("canvas");
      var canvas = canvasElement.getContext("2d");
      var loadingMessage = document.getElementById("loadingMessage");
      var outputContainer = document.getElementById("output");
      var outputMessage = document.getElementById("outputMessage");
      var outputData = document.getElementById("outputData");

      function drawLine(begin, end, color) {
        canvas.beginPath();
        canvas.moveTo(begin.x, begin.y);
        canvas.lineTo(end.x, end.y);
        canvas.lineWidth = 4;
        canvas.strokeStyle = color;
        canvas.stroke();
      }

      // Use facingMode: environment to attemt to get the front camera on phones
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
        video.srcObject = stream;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.play();
        requestAnimationFrame(tick);
      });

      function tick() {
        loadingMessage.innerText = "⌛ Loading video..."
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          loadingMessage.hidden = true;
          canvasElement.hidden = false;
          outputContainer.hidden = false;

          canvasElement.height = video.videoHeight;
          canvasElement.width = video.videoWidth;
          canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
          var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
          var code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          if (code) {
            drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
            drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
            drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
            drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
            outputMessage.hidden = true;
            outputData.parentElement.hidden = false;
            outputData.innerText = code.data;
          } else {
            outputMessage.hidden = false;
            outputData.parentElement.hidden = true;
          }
        }
        requestAnimationFrame(tick);
      }
     */

}
