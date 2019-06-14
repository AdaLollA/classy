import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CourseDetailPage } from './course-detail.page';
import {FloorPlanComponentModule} from '../../components/floor-plan/floor-plan.component.module';

const routes: Routes = [
  {
    path: '',
    component: CourseDetailPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        FloorPlanComponentModule
    ],
  declarations: [CourseDetailPage]
})
export class CourseDetailPageModule {}
