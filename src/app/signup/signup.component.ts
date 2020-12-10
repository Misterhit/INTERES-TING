import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpGroup: FormGroup;
  myMacAddress: string;
  myPassword: string;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.myPassword = this.genPassword();
    this.myMacAddress = this.genMAC();
    this.signUpGroup = new FormGroup({
      roomNumber: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(150),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
      ]),
      arrivalDate: new FormControl(null, [
        Validators.required,
      ]),
      departureDate: new FormControl(null, [
        Validators.required,
      ]),
      breakfastTime: new FormControl(null, [
        Validators.required,
      ]),
      lunchTime: new FormControl(null, [
        Validators.required,
      ]),
      dinnerTime: new FormControl(null, [
        Validators.required,
      ]),
      qrCode: new FormControl(null, [
        Validators.required,
        Validators.minLength(17),
        Validators.maxLength(17),
      ]),
    });

  }

  async onSubmit() {
    console.log(this.signUpGroup);
    await this.onSignUpSync();
    await this.onLogoutSync();
  }

  async onSignUpSync() {
    const roomNumber = this.signUpGroup.get('roomNumber').value.toString();
    const password = this.signUpGroup.get('password').value;
    const arrivalDate = this.signUpGroup.get('arrivalDate').value;
    const departureDate = this.signUpGroup.get('departureDate').value;
    const breakfastTime = this.signUpGroup.get('breakfastTime').value;
    const lunchTime = this.signUpGroup.get('lunchTime').value;
    const dinnerTime = this.signUpGroup.get('dinnerTime').value;
    const qrCode = this.signUpGroup.get('qrCode').value;
    const success = await this.authService.signUpSync(roomNumber, password, arrivalDate, departureDate, breakfastTime, lunchTime, dinnerTime, qrCode);
    if (success) {
      this.router.navigate(['home']);
    } else {
      console.log('Error en el registro');
    }
  }


  genMAC() {
    let hexDigits = '0123456789ABCDEF';
    let macAddress = '';
    for (let i = 0; i < 6; i++) {
      macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
      macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
      if (i !== 5) {
        macAddress += ':';
      }
    }
    return macAddress;
  }

  genPassword() {
    let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-', '_', '$', '&', '#', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let num = 8;
    let random = 3;
    let password = '';

    for (let i = 0; i < num; i++) {
      random = parseInt(String(Math.random() * abc.length));
      password = password + abc[random];
    }
    return password;
  }

  async onLogoutSync() {
    const success = await this.authService.logoutSync();
    if (success) {
      this.router.navigate(['auth']);
    }
  }

}
