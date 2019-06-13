import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Platform} from '@ionic/angular';
import {ThemeService} from '../../services/theme/theme.service';
import { disableBindings } from '@angular/core/src/render3';
import {TongueComponent} from '../../components/tongue/tongue.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    private disableScanning = false;

   @ViewChild(TongueComponent)
    public tongue: TongueComponent;

    constructor(public platform: Platform, private readonly theme: ThemeService) {

    }

    ngOnInit(): void {

    }

    readQr(data: string) {
        this.tongue.checkedIn();
    }

    tongueModeChange(inForeground: boolean) {
        this.disableScanning = inForeground;
    }

    shouldShowQRReader(): boolean {
        return this.platform.width() <= this.platform.height();

    }

    public switchTheme(): void {
        this.theme.cycleTheme();
    }
}
