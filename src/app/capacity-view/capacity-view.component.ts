import {Component, OnInit} from '@angular/core';
import {Capacity} from './capacity.model';
import {CapacityViewService} from './capacity-view.service';

@Component({
  selector: 'app-capacity-view',
  templateUrl: './capacity-view.component.html',
  styleUrls: ['./capacity-view.component.css']
})
export class CapacityViewComponent implements OnInit {

  gymCapacity: Capacity = new Capacity();
  poolCapacity: Capacity = new Capacity();

  constructor(private capacityService: CapacityViewService) {
  }

  ngOnInit(): void {
    this.capacityService.getPlace('gym').subscribe((gym: Capacity) => {
      this.gymCapacity = gym;
      console.log(this.gymCapacity);
      this.capacityService.getPlace('pool').subscribe((pool: Capacity) => {
        this.poolCapacity = pool;
        console.log(this.poolCapacity);
      });
    });
  }


}

