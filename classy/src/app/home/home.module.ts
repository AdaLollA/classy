import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {HomePage} from './home.page';
import {NgProgressModule} from '@ngx-progressbar/core';
import {TongueComponent} from '../tongue/tongue.component';
import {CourseCardComponent} from '../course-card/course-card.component';

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
    declarations: [HomePage, TongueComponent, CourseCardComponent]
})
export class HomePageModule {
}
