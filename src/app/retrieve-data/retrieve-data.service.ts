import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {BehaviorSubject, Observable} from 'rxjs';
import firebase from 'firebase';
import {User} from '../auth/user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetrieveDataService {

  adminQrCode: BehaviorSubject<string> = new BehaviorSubject<string>('');
  adminCalendar: string[] = [];
  adminObservableCalendar: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  adminRoomNumber: BehaviorSubject<string> = new BehaviorSubject<string>('');
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private fireDB: AngularFireDatabase) {
    this.itemsRef = fireDB.list('rooms');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
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

  deleteComment(key: string) {
    this.itemsRef.remove(key);
  }
}
