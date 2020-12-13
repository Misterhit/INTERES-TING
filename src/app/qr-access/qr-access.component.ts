import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HomeService} from '../home/home.service';
import {AuthService} from '../auth/auth.service';
import {User} from '../auth/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RetrieveDataService} from '../retrieve-data/retrieve-data.service';

@Component({
  selector: 'app-qr-access',
  templateUrl: './qr-access.component.html',
  styleUrls: ['./qr-access.component.css']
})
export class QrAccessComponent implements OnInit {

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
      this.authService.getUserRoom(this.uid).subscribe(
        (room: User[]) => {
          this.userRoom = room;
          this.retrieveDataService.getRoomObj(this.userRoom[0].roomNumber).subscribe(
            (obj: User) => {
              this.userRoomObj = obj;
              this.isLoading = true;
              console.log(this.userRoomObj);
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
      this.retrieveDataService.adminQrCode.subscribe(value => {
        this.adminQrcode = value;
      });
      this.retrieveDataService.adminRoomNumber.subscribe(value => {
        this.adminRoomNumber = value;
      });
    }
  }

  onSearchQrCode() {
    const roomNumber = this.adminForm.get('roomNumber').value.toString();
    this.retrieveDataService.generalAdminSearch(roomNumber);
  }
}









