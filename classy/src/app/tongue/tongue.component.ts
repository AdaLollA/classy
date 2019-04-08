import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-tongue',
  templateUrl: './tongue.component.html',
  styleUrls: ['./tongue.component.scss'],
})
export class TongueComponent implements OnInit {
  @ViewChild('tongue')
  tongue;

  constructor() { }

  ngOnInit() {}

  public drag(event) {
    console.log(event);
  }

}
