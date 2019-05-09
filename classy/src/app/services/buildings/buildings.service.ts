import { Injectable } from '@angular/core';
import { IBuilding } from './building';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

const allBuildings: IBuilding[] = [
  {
    id: '1',
    label: 'FH 1',
    floors: [
      {
        id: '0',
        label: 'Level 0',
      },
      {
        id: '1',
        label: 'Level 1',
      },
      {
        id: '2',
        label: 'Level 2',
      }
    ]
  },
  {
    id: '2',
    label: 'FH 2',
    floors: [
      {
        id: '0',
        label: 'Level 0',
      },
      {
        id: '1',
        label: 'Level 1',
      },
      {
        id: '2',
        label: 'Level 2',
      },
      {
        id: '3',
        label: 'Level 3',
      },
      {
        id: '4',
        label: 'Level 4',
      },
      {
        id: '5',
        label: 'Level 5',
      }
    ]
  },
  {
    id: '3',
    label: 'FH 3',
    floors: [
      {
        id: '0',
        label: 'Level 0',
      },
      {
        id: '1',
        label: 'Level 1',
      },
      {
        id: '2',
        label: 'Level 2',
      },
      {
        id: '3',
        label: 'Level 3',
      },
      {
        id: '4',
        label: 'Level 4',
      },
      {
        id: '5',
        label: 'Level 5',
      }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {

  constructor() {
  }

  public getAllBuildings(): Observable<IBuilding[]> {
    return of(allBuildings);
  }
}
