import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HomeService} from '../home/home.service';
import {AuthService} from '../auth/auth.service';
import {User} from '../auth/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RetrieveDataService} from '../retrieve-data/retrieve-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-qr-access',
  templateUrl: './qr-access.component.html',
  styleUrls: ['./qr-access.component.css']
})
export class QrAccessComponent implements OnInit, OnDestroy {

  isUserMode: boolean;
  loggedIn: boolean;
  searching: boolean;
  adminForm: FormGroup;
  uid: string;
  isLoading: boolean;
  userRoom: User[] = [];
  userRoomObj: User = new User();
  adminQrcode: string;
  adminRoomNumber: string;
  closeSub: Subscription[] = [];
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;


  constructor(private homeService: HomeService,
              private authService: AuthService,
              private retrieveDataService: RetrieveDataService) {
  }

  @ViewChild('input', {static: false}) input: ElementRef;


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
              console.log(this.userRoomObj);
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
      this.sub2 = this.retrieveDataService.adminQrCode.subscribe(value => {
        this.adminQrcode = value;
      });
      this.sub3 = this.retrieveDataService.adminRoomNumber.subscribe(value => {
        this.adminRoomNumber = value;
      });
      this.closeSub.push(this.sub2, this.sub3);
    }
  }

  onSearchQrCode() {
    const roomNumber = this.adminForm.get('roomNumber').value.toString();
    this.retrieveDataService.generalAdminSearch(roomNumber);
  }

  ngOnDestroy(): void {
    console.log("destroy");
    this.closeSub.forEach(value => {
      value.unsubscribe();
    });
  }


}









