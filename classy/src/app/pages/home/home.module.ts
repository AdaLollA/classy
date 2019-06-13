import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { HomePage } from './home.page';
import { NgProgressModule } from '@ngx-progressbar/core';
import { TongueComponent } from '../../components/tongue/tongue.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { ProviderComponent } from '../../components/provider/provider.component';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { QrReaderComponent } from '../../components/qr-reader/qr-reader.component';
import { FloorPlanComponentModule } from '../../components/floor-plan/floor-plan.component.module';
import { QrPresenterComponent } from 'src/app/components/qr-presenter/qr-presenter.component';
import { LoginCardComponent } from 'src/app/components/login-card/login-card.component';
import {CheckDialogComponent} from '../../components/check-dialog/check-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    NgProgressModule,
    DragDropModule,
    FloorPlanComponentModule
  ],
    declarations: [
        HomePage,
        TongueComponent,
        CourseCardComponent,
        ProviderComponent,
        AuthCardComponent,
        QrReaderComponent,
        QrPresenterComponent,
        LoginCardComponent,
        CheckDialogComponent
    ]
})
export class HomePageModule {
}
