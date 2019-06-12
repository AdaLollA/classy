import {Component, OnInit} from '@angular/core';
import {ICourse} from '../../components/tongue/tongue.component';

@Component({
    selector: 'app-course-detail',
    templateUrl: './course-detail.page.html',
    styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {

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
        image: 'https://www.netsolutions.com/insights/wp-content/uploads/2019/01/Featured-Image.jpg',
        url: 'https://hagenberg.elearning.fh-ooe.at/course/view.php?id=8229',
        lecturers: [
            'Dr. Matthias Steinbauer'
        ]
    } as ICourse;


    constructor() {
    }

    ngOnInit() {
    }

    public openElearning(): void {
        window.open(this.course.url, '_blank');
    }
}
