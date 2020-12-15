import {Component, OnDestroy, OnInit} from '@angular/core';
import {Capacity} from './capacity.model';
import {RetrieveDataService} from '../retrieve-data/retrieve-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-capacity-view',
  templateUrl: './capacity-view.component.html',
  styleUrls: ['./capacity-view.component.css']
})
export class CapacityViewComponent implements OnInit, OnDestroy {

  gymCapacity: Capacity = new Capacity();
  poolCapacity: Capacity = new Capacity();
  gameRoomCapacity: Capacity = new Capacity();
  closeSub: Subscription[] = [];
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  constructor(private retrieveDataService: RetrieveDataService) {
  }

  ngOnInit(): void {
    this.sub1 = this.retrieveDataService.getCapacity('gym').subscribe((gym: Capacity) => {
      this.gymCapacity = gym;
    });
    this.sub2 = this.retrieveDataService.getCapacity('pool').subscribe((pool: Capacity) => {
      this.poolCapacity = pool;
    });
    this.sub3 = this.retrieveDataService.getCapacity('gameRoom').subscribe((gameRoom: Capacity) => {
      this.gameRoomCapacity = gameRoom;
    });
    this.closeSub.push(this.sub1, this.sub2, this.sub3);
  }

  ngOnDestroy(): void {
    this.closeSub.forEach(value => {
      value.unsubscribe();
    });
  }

}

