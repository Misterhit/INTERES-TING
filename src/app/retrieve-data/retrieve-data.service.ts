import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {BehaviorSubject} from 'rxjs';
import firebase from 'firebase';
import {User} from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class RetrieveDataService {

  adminQrCode: BehaviorSubject<string> = new BehaviorSubject<string>('');
  adminCalendar: string[] = [];
  adminObservableCalendar: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  adminRoomNumber: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private fireDB: AngularFireDatabase) {
  }


  getCapacity(id: string) {
    return this.fireDB
      .object('controlAforo/' + id)
      .valueChanges();

  }

  getRoomObj(roomNumber: string) {
    return this.fireDB
      .object('rooms/' + roomNumber)
      .valueChanges();
  }

  getAllRooms() {
    return this.fireDB
      .list('rooms/')
      .valueChanges();
  }

  generalAdminSearch(roomNumber: string) {
    firebase.database()
      .ref('rooms/' + roomNumber).once('value')
      .then(res => {
        if (res.exists()) {
          this.getRoomObj(roomNumber).subscribe((obj: User) => {
            this.adminQrCode.next(obj.qrCode);
            this.adminRoomNumber.next(obj.roomNumber);
            this.adminCalendar = [];
            this.adminCalendar.push(obj.breakfastTime, obj.lunchTime, obj.dinnerTime);
            this.adminObservableCalendar.next(this.adminCalendar);
          });
        } else {
          alert('The room entered does not exist in our database!');
        }
      });
  }
}
