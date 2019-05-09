import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from '../tongue/tongue.component';
import { ModalController } from '@ionic/angular';
import { ProviderComponent } from '../provider/provider.component';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  progress: number = 0.3;
  interval;

  @Input('course')
  course: ICourse;

  constructor(public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.startTimer();
  }

  generateQR() {
    // https://ionicframework.com/docs/api/modal
    console.log('click');
    const modal = this.modalCtrl.create({
      component: ProviderComponent,
      /*
      componentProps: {
          'prop1': value,
          'prop2': value2
      }
       */
    });
    // modal.present();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if ( this.progress < 1 ) {
        this.progress += 0.001;
      } else {
        this.progress = 0;
      }
    }, 100);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
