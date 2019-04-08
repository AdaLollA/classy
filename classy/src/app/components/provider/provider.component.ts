import {Component, OnInit} from '@angular/core';

import qrcode from 'qrcode';

@Component({
    selector: 'app-provider',
    templateUrl: './provider.component.html',
    styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        this.generateQR('hello world');
    }

    public generateQR(content: string) {
        // http://thecodebarbarian.com/creating-qr-codes-with-node-js.html
        qrcode.toDataURL(content).then((res) => {
            console.log(res);
        });
    }

}
