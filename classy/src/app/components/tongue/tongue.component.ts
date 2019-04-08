import {Component, OnInit, ViewChild} from '@angular/core';
import {DragRef} from '@angular/cdk/drag-drop';

// todo extend interface
// todo relocate interface code
export interface ICourse {
    label: string
}

export interface IRoom {
    label: string
}

export interface ITongueStyle {
    boxShadow: string,
    borderRadius: string,
    top: string,
    transition: string
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
        boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.1)',
        top: '70vh',
        transition: ''
    };

    public defaultMode: boolean = true;

    public courses: ICourse[] = [];
    public rooms: IRoom[] = [];

    public visibleCourses: ICourse[] = [];
    public visibleRooms: IRoom[] = [];

    constructor() {
    }

    ngOnInit() {
        this.initTop = this.tongue.el.getBoundingClientRect().top;

        // todo temp test data
        this.courses = [
            {label: 'Course A'},
            {label: 'Course B'},
            {label: 'Course C'}
        ];

        this.rooms = [
            {label: 'Room A'},
            {label: 'Room B'},
            {label: 'Room C'}
        ];
    }

    public dragRelease(event) {
        if (this.prevPosition < this.tongue.el.getBoundingClientRect().top) {
            // move down
            console.log('down');
            this.tongueModeDefault(event.source._dragRef);

        } else if (this.prevPosition > this.tongue.el.getBoundingClientRect().top) {
            // move up
            console.log('up');
            this.tongueModeOpaque(event.source._dragRef);
        }
    }

    public dragStart() {
        this.prevPosition = this.tongue.el.getBoundingClientRect().top;
        this.tongueStyle.transition = '';
    }

    public tongueModeOpaque(drag: DragRef) {
        drag.reset();
        this.search.el.style.background = 'white';
        this.tongueStyle.boxShadow = '';
        this.tongueStyle.borderRadius = '';
        this.defaultMode = false;
        this.tongueStyle.transition = 'all 0.2s linear';
        this.tongueStyle.top = '0';
    }

    public tongueModeDefault(drag: DragRef) {
        drag.reset();
        this.search.el.style.background = 'transparent';
        this.tongueStyle.boxShadow = '0px -5px 10px rgba(0, 0, 0, 0.1)';
        this.tongueStyle.borderRadius = '20px 20px 0px 0px';
        this.defaultMode = true;
        this.tongueStyle.transition = 'all 0.2s linear';
        this.tongueStyle.top = '70vh';
    }

    searchFor(event) {
        let searchStr = event.target.value;

        this.visibleCourses = [];
        this.visibleRooms = [];

        if (searchStr && searchStr.trim() != '') {
            this.visibleCourses = this.courses.filter((item) => {
                return (item.label.toLowerCase().indexOf(searchStr.toLowerCase()) > -1);
            });
        }

        if (searchStr && searchStr.trim() != '') {
            this.visibleRooms = this.rooms.filter((item) => {
                return (item.label.toLowerCase().indexOf(searchStr.toLowerCase()) > -1);
            });
        }
    }
}
