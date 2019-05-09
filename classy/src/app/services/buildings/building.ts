export interface IBuilding {
  id: string;
  label: string;
  floors: IFloor[];
}

export interface IFloor {
  id: string;
  label: string;
}
