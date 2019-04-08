import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-tongue',
  templateUrl: './tongue.component.html',
  styleUrls: ['./tongue.component.scss'],
})
export class TongueComponent implements OnInit {
  @ViewChild('tongue')
  tongue;

  private initPosition: number;
  private prevPosition: number;

  constructor() { }

  ngOnInit() {
    this.initPosition = this.tongue.el.getBoundingClientRect().top;
  }

  public dragDrop() {
    if (this.prevPosition < this.tongue.el.getBoundingClientRect().top) {
      // move down
      console.log('down')
    } else {
      // move up
      console.log('up')
    }
  }

  public dragStart() {
    this.prevPosition = this.tongue.el.getBoundingClientRect().top;
  }

}
