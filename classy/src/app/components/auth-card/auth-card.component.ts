import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent implements OnInit {
  surname = 'surname';
  name = 'name';
  id = '1810455123';

  constructor() { }

  ngOnInit() {}

}
