import {Component, OnInit} from '@angular/core';
import {User} from '../auth/user.model';
import {RetrieveDataService} from '../retrieve-data/retrieve-data.service';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css']
})
export class AdminSearchComponent implements OnInit {

  userRoomNumber: User[] = [];

  constructor(private retrieveDataService: RetrieveDataService) {
  }

  ngOnInit(): void {
    this.retrieveDataService.getAllRooms().subscribe((room: User[]) => {
      this.userRoomNumber = room;
    });

  }

}
