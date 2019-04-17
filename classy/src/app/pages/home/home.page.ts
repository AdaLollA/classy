import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    private disableScanning: boolean = false;

    ngOnInit(): void {

    }

    readQr(data: string) {
        console.log(data, 'in HOME');
    }

    tongueModeChange(inForeground: boolean) {
        console.log(inForeground);
    }
}
