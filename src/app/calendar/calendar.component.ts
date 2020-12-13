import {Component, OnInit} from '@angular/core';
import {User} from '../auth/user.model';
import {HomeService} from '../home/home.service';
import {AuthService} from '../auth/auth.service';
import {QrAccessComponent} from '../qr-access/qr-access.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminSearchService} from '../admin/admin-search.service';

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
  adminCalendar: string[];
  adminRoomNumber: string;
  userRoom: User[] = [];
  userRoomObj: User = new User();
  adminForm: FormGroup;


  constructor(private homeService: HomeService,
              private authService: AuthService,
              private adminSearch: AdminSearchService) {
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
      this.authService.getRoom(this.uid).subscribe(
        (room: User[]) => {
          this.userRoom = room;
          this.authService.getRoomObj(this.userRoom[0].roomNumber).subscribe(
            (obj: User) => {
              this.userRoomObj = obj;
              this.isLoading = true;
            });
        });
    }
    if (!this.isUserMode && !this.loggedIn) {
      this.adminForm = new FormGroup({
        roomNumber: new FormControl(null, [
          Validators.required,
          Validators.min(1),
          Validators.max(150),
        ]),
      });
      this.adminSearch.adminObservableCalendar.subscribe(value => {
        this.adminCalendar = value;
      });
      this.adminSearch.adminRoomNumber.subscribe(value => {
        this.adminRoomNumber = value;
      });
    }
  }

  onSearchCalendar(){
    const roomNumber = this.adminForm.get('roomNumber').value.toString();
    this.adminSearch.generalSearch(roomNumber);

  }


  getDate() {
    const arrayOfWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateObj = new Date();
    const weekdayNumber = dateObj.getDay();
    const weekdayName = arrayOfWeekdays[weekdayNumber];

    const date = dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getDate();
    return weekdayName + ' - ' + date;

  }

}

