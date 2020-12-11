import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HomeService} from '../home/home.service';
import {AuthService} from '../auth/auth.service';
import {User} from '../auth/user.model';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-qr-access',
  templateUrl: './qr-access.component.html',
  styleUrls: ['./qr-access.component.css']
})
export class QrAccessComponent implements OnInit {

  isUserMode: boolean;
  loggedIn: boolean;
  uid: string;
  isLoading: boolean;
  userRoom: User[] = [];
  userRoomObj: User = new User();


  constructor(private homeService: HomeService,
              private authService: AuthService) { }

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
