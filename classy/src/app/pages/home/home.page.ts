import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    private disableScanning: boolean = false;

    constructor(public platform: Platform) {

    }

    ngOnInit(): void {

    }

    readQr(data: string) {
        console.log(data, 'in HOME');
    }

    tongueModeChange(inForeground: boolean) {
        this.disableScanning = inForeground;
    }

    shouldShowQRReader(): boolean {
        if (this.platform.width() > this.platform.height()) {
            return false;
        }
        return true;
    }
}
