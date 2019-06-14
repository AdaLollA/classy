import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUserData } from '../tongue/tongue.component';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent implements OnInit {

  @Input('userdata') userData: IUserData;

  @Output('loggedOut')
  logoutEvent =  new EventEmitter();

  constructor() { }

  ngOnInit() {}

  logout() {
    console.log('logout');
    this.logoutEvent.emit();
  }

  getName(): string {
    return (this.userData === null || this.userData === undefined) ? 'unknown' : this.userData.name;
  }

  getId(): string {
    return (this.userData === null || this.userData === undefined) ? 'unknown' : this.userData.studentId;
  }

  getBirthday(): string {
    return (this.userData === null || this.userData === undefined) ? 'unknown' : this.userData.birthday;
  }

  getCampus(): string {
    return (this.userData === null || this.userData === undefined) ? 'unknown' : this.userData.campus;
  }

}
