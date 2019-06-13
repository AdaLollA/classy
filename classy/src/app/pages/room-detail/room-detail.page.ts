import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { ICourse, IRoom } from '../../components/tongue/tongue.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
})
export class RoomDetailPage implements OnInit {

  public room = {
    id: 'FH2.422',
    label: 'Netcetera L1.ME',
    building: '2',
    floor: '4'
  };

  public course = {
    label: 'Cross-Platform Development of Mobile Applications',
    id: '2_MC507',
    startTime: new Date(2019, 6, 14, 13, 0),
    endTime: new Date(2019, 6, 14, 17, 55),
    room: {
      id: 'FH2.422',
      label: 'Netcetera L1.ME',
      building: '2',
      floor: '4'
    },
    image: 'assets/images/illustration-mobile.svg',
    url: 'https://hagenberg.elearning.fh-ooe.at/course/view.php?id=8229',
    lecturers: [
      'Dr. Matthias Steinbauer'
    ]
  } as ICourse;

  constructor(private readonly theme: ThemeService, private readonly router: Router) {
  }

  ngOnInit() {
  }

  public switchTheme(): void {
    this.theme.cycleTheme();
  }

  showCourseDetail() {
    this.router.navigateByUrl('/course-detail');
  }
}
