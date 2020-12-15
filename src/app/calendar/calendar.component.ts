import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../auth/user.model';
import {HomeService} from '../home/home.service';
import {AuthService} from '../auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RetrieveDataService} from '../retrieve-data/retrieve-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
  isUserMode: boolean;
  loggedIn: boolean;
  uid: string;
  isLoading: boolean;
  adminCalendar: string[];
  adminRoomNumber: string;
  userRoom: User[] = [];
  userRoomObj: User = new User();
  adminForm: FormGroup;
  closeSub: Subscription[] = [];
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;


  constructor(private homeService: HomeService,
              private authService: AuthService,
              private retrieveDataService: RetrieveDataService) {
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
    if (this.isUserMode && this.loggedIn) {
      this.sub1 = this.authService.getUserRoom(this.uid).subscribe(
        (room: User[]) => {
          this.userRoom = room;
          this.retrieveDataService.getRoomObj(this.userRoom[0].roomNumber).subscribe(
            (obj: User) => {
              this.userRoomObj = obj;
              this.isLoading = true;
            });
        });
      this.closeSub.push(this.sub1);
    }
    if (!this.isUserMode && !this.loggedIn) {
      this.adminForm = new FormGroup({
        roomNumber: new FormControl(null, [
          Validators.required,
          Validators.min(1),
          Validators.max(150),
        ]),
      });
      this.sub2 = this.retrieveDataService.adminObservableCalendar.subscribe(value => {
        this.adminCalendar = value;
      });
      this.sub3 = this.retrieveDataService.adminRoomNumber.subscribe(value => {
        this.adminRoomNumber = value;
      });
      this.closeSub.push(this.sub2, this.sub3);
    }
  }

  onSearchCalendar() {
    const roomNumber = this.adminForm.get('roomNumber').value.toString();
    this.retrieveDataService.generalAdminSearch(roomNumber);

  }


  getDate() {
    const arrayOfWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateObj = new Date();
    const weekdayNumber = dateObj.getDay();
    const weekdayName = arrayOfWeekdays[weekdayNumber];

    const date = dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getDate();
    return weekdayName + ' - ' + date;

  }

  ngOnDestroy(): void {
    this.closeSub.forEach(value => {
      value.unsubscribe();
    });
  }

}

