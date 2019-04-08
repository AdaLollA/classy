import {Component, OnInit, ViewChild} from '@angular/core';
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

    constructor() {

    }

    ngOnInit(): void {
        this.captureVideo();
    }

    public captureVideo() {
        navigator.mediaDevices.getUserMedia(this.constraints)
            .then((stream) => {
                this.handleSuccess(stream);
            }).catch((error) => {
            this.handleError(error);
        });
    };

    public screenShotButtonClick() {
        this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
        this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
        this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0);
        this.image.nativeElement.src = this.canvas.nativeElement.toDataURL('image/png');
        this.recognizeImage(this.image.nativeElement.src);
    };

    public handleSuccess(stream) {
        this.screenShotButtonDisabled = false;
        this.video.nativeElement.srcObject = stream;
    }

    public handleError(error) {
        console.error(error);
    }

    recognizeImage(image) {
        console.log(image);
        // todo
    }

}
