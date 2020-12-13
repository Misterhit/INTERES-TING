import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import firebase from 'firebase';
import {User} from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminSearchService {

  adminQrCode: BehaviorSubject<string> = new BehaviorSubject<string>('');
  adminCalendar: string[] = [];
  adminObservableCalendar: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  adminRoomNumber: BehaviorSubject<string> = new BehaviorSubject<string>('');


  constructor(private authService: AuthService) {
  }


  generalSearch(roomNumber: string) {
    firebase.database()
      .ref('rooms/' + roomNumber).once('value')
      .then(res => {
        if (res.exists()) {
          this.authService.getRoomObj(roomNumber).subscribe((obj: User) => {
            this.adminQrCode.next(obj.qrCode);
            this.adminRoomNumber.next(obj.roomNumber);
            this.adminCalendar = [];
            this.adminCalendar.push(obj.breakfastTime, obj.lunchTime, obj.dinnerTime);
            this.adminObservableCalendar.next(this.adminCalendar);
          });
        } else {
          alert("The room entered does not exist in our database!");
        }
      });
  }

}
