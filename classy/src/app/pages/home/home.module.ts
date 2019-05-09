import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {HomePage} from './home.page';
import {NgProgressModule} from '@ngx-progressbar/core';
import {TongueComponent} from '../../components/tongue/tongue.component';
import {CourseCardComponent} from '../../components/course-card/course-card.component';
import {ProviderComponent} from '../../components/provider/provider.component';
import {AuthCardComponent} from '../../components/auth-card/auth-card.component';
import {FloorPlanComponent} from '../../components/floor-plan/floor-plan.component';
import {QrReaderComponent} from '../../components/qr-reader/qr-reader.component';
import { QrPresenterComponent } from 'src/app/components/qr-presenter/qr-presenter.component';

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
        DragDropModule
    ],
    declarations: [HomePage, TongueComponent, CourseCardComponent, ProviderComponent, AuthCardComponent, FloorPlanComponent, QrReaderComponent, QrPresenterComponent]
})
export class HomePageModule {
}
