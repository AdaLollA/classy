import {Component, OnInit, ViewChild} from '@angular/core';

// todo extend interface
// todo relocate interface code
export interface ICourse {
  title: string
}

@Component({
  selector: 'app-tongue',
  templateUrl: './tongue.component.html',
  styleUrls: ['./tongue.component.scss'],
})
export class TongueComponent implements OnInit {
  @ViewChild('tongue')
  tongue;

  private initTop: number;
  private prevPosition: number;

  public courses: ICourse[] = [];

  constructor() { }

  ngOnInit() {
    this.initTop = this.tongue.el.getBoundingClientRect().top;

    // todo temp test data
    this.courses = [
      {title: 'Course A'},
      {title: 'Course B'},
      // {title: 'Course C'}
    ]
  }

  public dragEnd(event) {
    // todo commented code in this function is for snapping to top / bottom
    // event.source._dragRef.reset();

    if (this.prevPosition < this.tongue.el.getBoundingClientRect().top) {
      // move down
      console.log('down');
      /*
      event.source._activeTransform = {x: 0, y: 0};
      event.source._passiveTransform = {x: 0, y: 0};
       */
    } else if (this.prevPosition > this.tongue.el.getBoundingClientRect().top) {
      // move up
      console.log('up')
      /*
      event.source._activeTransform = {x: 0, y: -568};
      event.source._passiveTransform = {x: 0, y: -568};
       */
    }
  }

  public dragStart() {
    this.prevPosition = this.tongue.el.getBoundingClientRect().top;
  }

}
