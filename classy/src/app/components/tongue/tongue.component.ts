import {Component, OnInit, ViewChild} from '@angular/core';

// todo extend interface
// todo relocate interface code
export interface ICourse {
    title: string
}

export interface ITongueStyle {
    boxShadow: string,
    borderRadius: string
}

@Component({
    selector: 'app-tongue',
    templateUrl: './tongue.component.html',
    styleUrls: ['./tongue.component.scss'],
})
export class TongueComponent implements OnInit {
    @ViewChild('search')
    search;

    @ViewChild('tongue')
    tongue;

    private initTop: number;
    private prevPosition: number;

    public tongueStyle: ITongueStyle = {
        borderRadius: '20px 20px 0px 0px',
        boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.1)'
    };

    public defaultMode: boolean = true;
    public courses: ICourse[] = [];

    constructor() {
    }

    ngOnInit() {
        this.initTop = this.tongue.el.getBoundingClientRect().top;

        // todo temp test data
        this.courses = [
            {title: 'Course A'},
            {title: 'Course B'},
            {title: 'Course C'}
        ];
    }

    public dragEnd(event) {
        // todo commented code in this function is for snapping to top / bottom
        // event.source._dragRef.reset();

        if (this.prevPosition < this.tongue.el.getBoundingClientRect().top) {
            // move down
            console.log('down');
            this.tongueModeDefault();
            /*
                  event.source._activeTransform = {x: 0, y: 0};
                  event.source._passiveTransform = {x: 0, y: 0};
                   */
        } else if (this.prevPosition > this.tongue.el.getBoundingClientRect().top) {
            // move up
            console.log('up');
            this.tongueModeOpaque();
            /*
            event.source._activeTransform = {x: 0, y: -568};
            event.source._passiveTransform = {x: 0, y: -568};
             */
        }
        console.log(this.tongue.el.style);
    }

    public dragStart() {
        this.prevPosition = this.tongue.el.getBoundingClientRect().top;
    }

    public tongueModeOpaque() {
        this.search.el.style.background = 'white';
        this.tongueStyle.boxShadow = '';
        this.tongueStyle.borderRadius = '';
        this.defaultMode = false;
    }

    public tongueModeDefault() {
        this.search.el.style.background = 'transparent';
        this.tongueStyle.boxShadow = '0px -5px 10px rgba(0, 0, 0, 0.1)';
        this.tongueStyle.borderRadius = '20px 20px 0px 0px';
        this.defaultMode = true;
    }

}