import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent implements OnInit {
  surname = 'Mustermann';
  name = 'Max';
  id = '1810455123';
  birthday = '01.01.1970';
  campus = 'Hagenberg'

  constructor() { }

  ngOnInit() {}

  logout() {
    console.log('logout');
  }

}
