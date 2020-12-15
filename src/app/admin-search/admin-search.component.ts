import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../auth/user.model';
import {RetrieveDataService} from '../retrieve-data/retrieve-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css']
})
export class AdminSearchComponent implements OnInit, OnDestroy {

  userRoomNumber: User[] = [];
  closeSub: Subscription;
  isLoading: boolean;

  constructor(private retrieveDataService: RetrieveDataService) {
  }

  ngOnInit(): void {
    this.closeSub = this.retrieveDataService.getAllRooms().subscribe((room: User[]) => {
      this.userRoomNumber = room;
      this.isLoading = true;
    });

  }

  onRemove(roomNumber: string) {
    this.retrieveDataService.deleteComment(roomNumber);
  }

  ngOnDestroy(): void {
    this.closeSub.unsubscribe();
  }

}
