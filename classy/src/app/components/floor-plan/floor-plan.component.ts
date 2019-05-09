import { Component, OnInit } from '@angular/core';
import { IBuilding, IFloor } from '../../services/buildings/building';
import { BuildingsService } from '../../services/buildings/buildings.service';

@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.scss'],
})
export class FloorPlanComponent implements OnInit {

  public buildings: IBuilding[];
  public selectedBuilding: IBuilding;
  public selectedBuildingId = '2';
  public selectedFloor: IFloor;
  public selectedFloorId = '4';

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
    this.selectedBuildingId = event.detail.value;
    this.selectedBuilding = this.buildings.find(building => building.id === event.detail.value);
    this.selectedFloorId = '0';
    this.selectedFloor = this.selectedBuilding.floors[0];
  }

  public setCurrentFloor(event): void {
    this.selectedFloorId = event.detail.value;
    this.selectedFloor = this.selectedBuilding.floors.find(floor => floor.id === event.detail.value);
  }
}
