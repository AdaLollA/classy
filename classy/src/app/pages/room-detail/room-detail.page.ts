import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { IRoom } from '../../components/tongue/tongue.component';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
})
export class RoomDetailPage implements OnInit {

  public room: IRoom;

  constructor(private readonly theme: ThemeService) {
    this.room = {
      id: 'FH2.422',
      label: 'Netcetera L1.ME',
      building: '2',
      floor: '3'
    };
  }

  ngOnInit() {
  }

  public switchTheme(): void {
    this.theme.cycleTheme();
  }

}
