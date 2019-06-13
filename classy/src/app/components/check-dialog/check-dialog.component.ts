import {Component} from '@angular/core';

@Component({
    selector: 'app-check-dialog',
    templateUrl: './check-dialog.component.html',
    styleUrls: ['./check-dialog.component.scss'],
})
export class CheckDialogComponent {
    loaderClasses = '';
    checkOpacity = '0';
    hidden = true;

    public check() {
        setTimeout(() => {
            this.hidden = false;
            this.loaderClasses = 'load-complete';
            this.checkOpacity = '1';
            setTimeout(() => {
                this.reset();
            }, 1000);
        }, 500);
    }

    private reset() {
        this.hidden = true;
        this.loaderClasses = '';
        this.checkOpacity = '0';
    }

}
