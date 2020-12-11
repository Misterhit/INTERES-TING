import { Component, OnInit } from '@angular/core';
import {User} from '../auth/user.model';
import {HomeService} from '../home/home.service';
import {AuthService} from '../auth/auth.service';
import {QrAccessComponent} from '../qr-access/qr-access.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  isUserMode: boolean;
  loggedIn: boolean;
  uid: string;
  isLoading: boolean;
  userRoom: User[] = [];
  userRoomObj: User = new User();

  constructor(private homeService: HomeService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.homeService.isUserMode.subscribe(value => {
      this.isUserMode = value;
    });
    this.authService.loggedIn.subscribe(value => {
      this.loggedIn = value;
    });
    this.authService.currentID2.subscribe(value => {
      this.uid = value;
    });
    this.authService.getRoom(this.uid).subscribe(
      (room: User[]) => {
        this.userRoom = room;
        this.authService.getRoomObj(this.userRoom[0].roomNumber).subscribe(
          (obj: User) => {
            this.userRoomObj = obj;
            this.isLoading = true;
            console.log(this.userRoomObj);
          });
      });

  }
}
