import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Platform} from '@ionic/angular';
import {ThemeService} from '../../services/theme/theme.service';
import {disableBindings} from '@angular/core/src/render3';
import {TongueComponent} from '../../components/tongue/tongue.component';
import {CheckDialogComponent} from '../../components/check-dialog/check-dialog.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    private disableScanning = false;

    @ViewChild(TongueComponent)
    public tongue: TongueComponent;

    @ViewChild(CheckDialogComponent)
    public checkDialog: CheckDialogComponent;

    constructor(public platform: Platform, private readonly theme: ThemeService) {

    }

    ngOnInit(): void {

    }

    readQr(data: string) {
        this.checkDialog.check();
        setTimeout(() => {
            this.tongue.checkedIn();
        }, 2000);
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
