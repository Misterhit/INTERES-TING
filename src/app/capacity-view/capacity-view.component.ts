import {Component, OnInit} from '@angular/core';
import {Capacity} from './capacity.model';
import {CapacityViewService} from './capacity-view.service';
import {Gym} from './gym.model';
import {Pool} from './pool.model';

@Component({
  selector: 'app-capacity-view',
  templateUrl: './capacity-view.component.html',
  styleUrls: ['./capacity-view.component.css']
})
export class CapacityViewComponent implements OnInit {
  capacity: Capacity[] = [];
  gymCapacity: Gym = new Gym();
  poolCapacity: Pool = new Pool();

  constructor(private capacityService: CapacityViewService) {
  }

  ngOnInit(): void {
    this.capacityService.getCapacity().subscribe((value: Capacity[]) => {
      this.capacity = value;
      this.capacityService.getPlace('gym').subscribe((value2: Gym) => {
        this.gymCapacity = value2;
        console.log(this.gymCapacity);
        this.capacityService.getPlace('pool').subscribe((value3: Pool) => {
          this.poolCapacity = value3;
          console.log(this.poolCapacity);
        });
      });
    });
  }
}

