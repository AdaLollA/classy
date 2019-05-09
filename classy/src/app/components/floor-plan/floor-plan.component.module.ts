import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FloorPlanComponent } from './floor-plan.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FloorPlanComponent
  ],
  imports: [
    IonicModule,
    PinchZoomModule,
    CommonModule
  ],
  exports: [
    FloorPlanComponent
  ]
})
export class FloorPlanComponentModule {
}
