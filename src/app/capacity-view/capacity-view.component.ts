import {Component, OnInit} from '@angular/core';
import {Capacity} from './capacity.model';
import {RetrieveDataService} from '../retrieve-data/retrieve-data.service';

@Component({
  selector: 'app-capacity-view',
  templateUrl: './capacity-view.component.html',
  styleUrls: ['./capacity-view.component.css']
})
export class CapacityViewComponent implements OnInit {

  gymCapacity: Capacity = new Capacity();
  poolCapacity: Capacity = new Capacity();

  constructor(private retrieveDataService: RetrieveDataService) {
  }

  ngOnInit(): void {
    this.retrieveDataService.getCapacity('gym').subscribe((gym: Capacity) => {
      this.gymCapacity = gym;
      console.log(this.gymCapacity);
      this.retrieveDataService.getCapacity('pool').subscribe((pool: Capacity) => {
        this.poolCapacity = pool;
        console.log(this.poolCapacity);
      });
    });
  }


}

