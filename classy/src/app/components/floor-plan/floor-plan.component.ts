import {Component, Input, OnInit} from '@angular/core';
import { IBuilding, IFloor } from '../../services/buildings/building';
import { BuildingsService } from '../../services/buildings/buildings.service';

@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.scss'],
})
export class FloorPlanComponent implements OnInit {

  @Input()
  public buildingId = '2';

  @Input()
  public floorId = '4';

  public buildings: IBuilding[];
  public selectedBuilding: IBuilding;
  public selectedFloor: IFloor;

  constructor(private readonly buildingsService: BuildingsService) {
  }

  ngOnInit() {
    this.buildingsService.getAllBuildings().subscribe((buildings: IBuilding[]) => {
      this.buildings = buildings;
      this.selectedBuilding = this.buildings[1];
      this.selectedFloor = this.selectedBuilding.floors[3];
    });
  }

  public setCurrentBuilding(event): void {
    this.buildingId = event.detail.value;
    this.selectedBuilding = this.buildings.find(building => building.id === event.detail.value);
    this.floorId = '0';
    this.selectedFloor = this.selectedBuilding.floors[0];
  }

  public setCurrentFloor(event): void {
    this.floorId = event.detail.value;
    this.selectedFloor = this.selectedBuilding.floors.find(floor => floor.id === event.detail.value);
  }
}
