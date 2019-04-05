import {Component, OnInit, ViewChild} from '@angular/core';
import * as Tesseract from 'tesseract.js';
import {NgProgress} from '@ngx-progressbar/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    screenShotButtonDisabled: boolean = true;

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

    ngOnInit(): void {
        console.log(this.video);
        console.log(this.image);
        console.log(this.canvas);
    }

    public captureVideoButtonClick() {
        navigator.mediaDevices.getUserMedia(this.constraints)
            .then((stream) => {
                this.handleSuccess(stream);
            }).catch(this.handleError);
    };

    public screenShotButtonClick() {
        this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
        this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
        this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);
        // Other browsers will fall back to image/png
        this.image.nativeElement.src = this.canvas.nativeElement.toDataURL('image/webp');
    };

    public handleSuccess(stream) {
        this.screenShotButtonDisabled = false;
        this.video.nativeElement.srcObject = stream;
    }

    public handleError(err) {
        console.error(err);
    }

}
