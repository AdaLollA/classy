import {Component, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {timer} from 'rxjs';

import QRReader from 'qrcode-reader';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    public screenShotButtonDisabled: boolean = true;
    private qr = new QRReader();

    constraints = {
        video: true,
        audio: false
    };

    @ViewChild('video')
    video;

    @ViewChild('image')
    image;

    @ViewChild('canvas')
    canvas;

    constructor() {
    }

    ngOnInit(): void {
        // this.captureVideo();
        // this.observableTimer();
        // this.initQrReader();
    }

    private initQrReader() {
        this.qr.callback = function (err, result) {
            if (result) {
                console.log(result);
            } else {
                console.error(err);
            }
        };
    }

    private observableTimer() {
        const source = timer(500, 1000);
        const abc = source.subscribe(val => {
            // console.log(val, '-');
            this.screenShot();
        });
    }

    public captureVideo() {
        navigator.mediaDevices.getUserMedia(this.constraints)
            .then((stream) => {
                this.handleSuccess(stream);
            }).catch((error) => {
            this.handleError(error);
        });
    };

    public screenShot() {
        this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
        this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
        this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);
        this.image.nativeElement.src = this.canvas.nativeElement.toDataURL('image/png');
        this.readQR(this.image.nativeElement.src);
    };

    public handleSuccess(stream) {
        this.screenShotButtonDisabled = false;
        this.video.nativeElement.srcObject = stream;
    }

    public handleError(error) {
        console.error(error);
    }

    public readQR(image) {
        // http://thecodebarbarian.com/creating-qr-codes-with-node-js.html
        this.qr.decode(image);
    }

}
