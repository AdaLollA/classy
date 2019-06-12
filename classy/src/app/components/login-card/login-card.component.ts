import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { IonProgressBar } from '@ionic/angular';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {

  @Input('loading') loading = false;

  @Output('onImageLogin') imageLoginEmitter = new EventEmitter<boolean>();

  public progressBarType = "determinate";

  public buttonDisabled = false;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const loadingChange: boolean = changes.name.currentValue;
    if (loadingChange == true) {
      this.buttonDisabled = true;
      this.progressBarType = "indeterminate";
    } else {
      this.buttonDisabled = false;
      this.progressBarType = "determinate";
    }
    console.log("Loading: " + this.loading);
  }

  loginClicked() {
    console.log("Login clicked")
    this.imageLoginEmitter.emit(true);
  }

}
