import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, snapshotChanges} from '@angular/fire/database';
import firebase from 'firebase';
import {root} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentID: string;
  currentID2: BehaviorSubject<string> = new BehaviorSubject<string>('');


  constructor(private router: Router,
              private fireAuth: AngularFireAuth,
              private fireDB: AngularFireDatabase) {

    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.setUID(user.uid);
        this.currentID2.next(user.uid);
        this.loggedIn.next(true);
      } else {
        this.loggedIn.next(false);
        this.setUID(null);
      }
    });
  }

  async signUpSync(
    roomNumber: string,
    password: string,
    arrivalDate: string,
    departureDate: string,
    breakfastTime: string,
    lunchTime: string,
    dinnerTime: string,
    qrCode: string): Promise<boolean> {
    try {
      const falseEmail = roomNumber + '@InteresTING.hotel';
      const newUser = await firebase.auth().createUserWithEmailAndPassword(falseEmail, password);
      this.currentID = newUser.user.uid;
      this.postUser(roomNumber, this.currentID, arrivalDate, departureDate, breakfastTime, lunchTime, dinnerTime, qrCode);
      return true;
      //this.loggedIn.next(false);
    } catch (err) {
      console.log(err);
      return false;
      //this.loggedIn.next(false);
      //this.error.next(err.message);
    }
  }

  postUser(userRoomNumber: string,
           userRefId: string,
           userArrivalDate: string,
           userDepartureDate: string,
           userBreakfast: string,
           userLunch: string,
           userDinner: string,
           userQrcode: string) {
    const usernameRef = this.fireDB.object('rooms/' + userRoomNumber);
    usernameRef.set({
      roomNumber: userRoomNumber,
      RefId: userRefId,
      arrivalDate: userArrivalDate,
      departureDate: userDepartureDate,
      breakfastTime: userBreakfast,
      lunchTime: userLunch,
      dinnerTime: userDinner,
      qrCode: userQrcode
    });
  }

  async loginSync(roomNumber: string, password: string): Promise<boolean> {
    try {
      const falseEmail = roomNumber + '@InteresTING.hotel';
      await firebase.auth().signInWithEmailAndPassword(falseEmail, password);
      this.loggedIn.next(true);
      return true;
    } catch (err) {
      console.log(err);
      this.loggedIn.next(false);
      return false;
      //this.error.next(err.message);
    }
  }

  async logoutSync(): Promise<boolean> {
    try {
      await firebase.auth().signOut();
      this.loggedIn.next(false);
      this.setUID(null);
      return true;
    } catch (err) {
      console.log(err);
      this.loggedIn.next(true);
      return false;
      //this.error.next(err.message);
    }
  }

  setUID(UID: string) {
    this.currentID = UID;
  }

  getUID() {
    return this.currentID;
  }

  getRoom(UID: string) {
    return this.fireDB
      .list('rooms', (ref) => {
        return ref.orderByChild('RefId').equalTo(UID); //Filtro
      })
      .valueChanges();
  }

  getRoomObj(roomNumber: string) {
    return this.fireDB
      .object('rooms/' + roomNumber)
      .valueChanges();
  }
}


