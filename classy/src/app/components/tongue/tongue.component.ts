import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DragRef} from '@angular/cdk/drag-drop';

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
    @Output('inForeground')
    inForegroundEmitter: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('search')
    search;

    @ViewChild('tongue')
    tongue;

    private initTop: number;
    private prevPosition: number;
    private drag: DragRef;

    public tongueStyle: ITongueStyle = {
        borderRadius: '20px 20px 0px 0px',
        boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.1)',
        top: '70vh',
        transition: ''
    };
    resultHeight: string = '0px';

    public defaultMode: boolean = true;

    public courses: ICourse[] = [];
    public rooms: IRoom[] = [];

    public visibleCourses: ICourse[] = [];
    public visibleRooms: IRoom[] = [];

    constructor() {
    }

    ngOnInit() {
        this.initTop = this.tongue.el.getBoundingClientRect().top;

        // test data
        this.courses = [
            {label: 'Course A'},
            {label: 'Course B'},
            {label: 'Course B'},
            {label: 'Course B'},
            {label: 'Course C'}
        ];

        this.rooms = [
            {label: 'Room A'},
            {label: 'Room B'},
            {label: 'Room B'},
            {label: 'Room B'},
            {label: 'Room C'}
        ];

        // init searchable objects by calling search with null
        this.searchFor(null);
    }

    public dragRelease() {
        if (this.prevPosition < this.tongue.el.getBoundingClientRect().top) {
            this.tongueModeDefault(this.drag);

        } else if (this.prevPosition > this.tongue.el.getBoundingClientRect().top) {
            this.tongueModeOpaque(this.drag);
        }
    }

    public dragStart(event) {
        this.inForegroundEmitter.emit(true);
        this.drag = event.source._dragRef;
        this.prevPosition = this.tongue.el.getBoundingClientRect().top;
        this.tongueStyle.transition = '';
    }

    public tongueModeOpaque(drag: DragRef) {
        drag ? drag.reset() : '';
        this.search.el.style.background = 'white';
        this.tongueStyle.boxShadow = '';
        this.tongueStyle.borderRadius = '';
        this.defaultMode = false;
        this.tongueStyle.transition = 'all 0.2s linear';
        this.tongueStyle.top = '0';
    }

    public tongueModeDefault(drag: DragRef) {
        drag ? drag.reset() : '';
        this.search.el.style.background = 'transparent';
        this.tongueStyle.boxShadow = '0px -5px 10px rgba(0, 0, 0, 0.1)';
        this.tongueStyle.borderRadius = '20px 20px 0px 0px';
        this.defaultMode = true;
        this.tongueStyle.transition = 'all 0.2s linear';
        this.tongueStyle.top = '70vh';
        setTimeout(() => {
            this.inForegroundEmitter.emit(false);
        });
    }

    public searchFor(event) {
        if (event) {
            let searchStr = event.target.value;
            if (searchStr.length > 0) {
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
            } else {
                this.visibleCourses = this.courses;
                this.visibleRooms = this.rooms;
            }
        } else {
            this.visibleCourses = this.courses;
            this.visibleRooms = this.rooms;
        }
    }

    public searchFocus() {
        this.tongueModeOpaque(this.drag);
        this.resultHeight = '275px';
    }

    public searchBlur() {
        // this.tongueModeDefault(this.drag);
        this.resultHeight = '0px';
    }
}
