import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DragRef } from '@angular/cdk/drag-drop';
import { Platform } from '@ionic/angular';
import { delay } from 'q';

export interface ICourse {
  id: string;
  label: string;
  startTime: Date;
  endTime: Date;
  room: IRoom;
  lecturers?: string[];
}

export interface IRoom {
  id: string;
  label: string;
}

export interface ITongueStyle {
  boxShadow: string;
  borderRadius: string;
  top: string;
  transition: string;
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

  public loginLoading = false;

  private initTop: number;
  private prevPosition: number;
  private drag: DragRef;

  public tongueStyle: ITongueStyle = {
    borderRadius: '20px 20px 0px 0px',
    boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.1)',
    top: '70vh',
    transition: ''
  };
  resultHeight = '0px';

  public defaultMode = true;

  public courses: ICourse[] = [];
  public rooms: IRoom[] = [];

  public visibleCourses: ICourse[] = [];
  public visibleRooms: IRoom[] = [];

  constructor(private platform: Platform) {
  }

  ngOnInit() {
    this.initTop = this.tongue.el.getBoundingClientRect().top;

    if ( this.platform.is('desktop') ) {
      this.tongueStyle.top = '0';
    }
    
    // test data
    this.rooms = [
      {
        id: 'FH2.422',
        label: 'Netcetera L1.ME'
      },
      {
        id: 'FH2.414',
        label: 'GDS'
      },
      {
        id: 'FH2.424',
        label: 'L2.ME'
      },
      {
        id: 'FH2.408',
        label: 'UST'
      },
      {
        id: 'FH2.454',
        label: 'SR2.ME'
      },
    ];

    this.courses = [
      {
        label: 'Cross-Platform Development of Mobile Applications',
        id: '2_MC507',
        startTime: new Date(2019, 5, 10, 13, 0),
        endTime: new Date(2019, 5, 10, 17, 55),
        room: this.rooms[0]
      },
      {
        label: 'Game Production',
        id: 'IM540',
        startTime: new Date(2019, 5, 10, 13, 0),
        endTime: new Date(2019, 5, 10, 17, 55),
        room: this.rooms[2]
      },
      {
        label: 'Interactive Technologies',
        id: '2_MC510',
        startTime: new Date(2019, 5, 10, 13, 0),
        endTime: new Date(2019, 5, 10, 17, 55),
        room: this.rooms[1]
      },
      {
        label: 'Game Art & Level Design',
        id: 'DA530',
        startTime: new Date(2019, 5, 10, 13, 0),
        endTime: new Date(2019, 5, 10, 17, 55),
        room: this.rooms[3]
      },
      {
        label: 'Systems Engineering 2: Real-Time and Mobility in UML',
        id: '2_MC516',
        startTime: new Date(2019, 5, 10, 13, 0),
        endTime: new Date(2019, 5, 10, 17, 55),
        room: this.rooms[4]
      },
    ];

    // init searchable objects by calling search with null
    this.searchFor(null);
  }

  public dragRelease() {
    if ( this.prevPosition < this.tongue.el.getBoundingClientRect().top ) {
      this.tongueModeDefault(this.drag);

    } else if ( this.prevPosition > this.tongue.el.getBoundingClientRect().top ) {
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
    }, 200);
  }

  public searchFor(event) {
    if ( event ) {
      const searchStr = event.target.value;
      if ( searchStr.length > 0 ) {
        this.visibleCourses = [];
        this.visibleRooms = [];

        if ( searchStr && searchStr.trim() !== '' ) {
          this.visibleCourses = this.courses.filter((item) => {
            return (item.label.toLowerCase().indexOf(searchStr.toLowerCase()) > -1);
          });
        }

        if ( searchStr && searchStr.trim() !== '' ) {
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
    this.resultHeight = '350px';
  }

  public searchBlur() {
    // this.tongueModeDefault(this.drag);
    this.resultHeight = '0px';
  }

  public isLoggedIn() {
    return false;
  }

  public loginWithImage() {
    console.log("loginwithimage")
    this.loginLoading = true;
  }
}
