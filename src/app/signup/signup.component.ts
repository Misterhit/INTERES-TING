import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpGroup: FormGroup;
  isUserMode = false;
  myMacAddress: string;
  myPassword: string;

  constructor() {
  }

  ngOnInit(): void {
    this.myPassword = this.genPassword();
    this.myMacAddress = this.genMAC();
    this.signUpGroup = new FormGroup({
      room: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(150),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
      ]),
      arrival: new FormControl(null, [
        Validators.required,
      ]),
      departure: new FormControl(null, [
        Validators.required,
      ]),
      breakfast: new FormControl(null, [
        Validators.required,
      ]),
      lunch: new FormControl(null, [
        Validators.required,
      ]),
      dinner: new FormControl(null, [
        Validators.required,
      ]),
      access: new FormControl(null, [
        Validators.required,
        Validators.minLength(17),
        Validators.maxLength(17),
      ]),
    });

  }

  onSubmit() {
    console.log(this.signUpGroup);
  }


  changeMode() {
    this.isUserMode = !this.isUserMode;
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


}
