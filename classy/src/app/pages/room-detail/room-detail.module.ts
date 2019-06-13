import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RoomDetailPage } from './room-detail.page';
import { FloorPlanComponentModule } from '../../components/floor-plan/floor-plan.component.module';

const routes: Routes = [
  {
    path: '',
    component: RoomDetailPage
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
  declarations: [RoomDetailPage]
})
export class RoomDetailPageModule {}
