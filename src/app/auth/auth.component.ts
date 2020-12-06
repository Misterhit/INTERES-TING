import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signUpGroup: FormGroup;
  loginForm: FormGroup;

  isUserMode = false;

  constructor() {
  }

  ngOnInit(): void {
    this.signUpGroup = new FormGroup({
      room: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
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
      ]),
    });
  }

  onSubmit() {
    const room = this.signUpGroup.get('room').value;
    const password = this.signUpGroup.get('password').value;
    const arrival = this.signUpGroup.get('arrival').value;
    const departure = this.signUpGroup.get('departure').value;
    const breakfast = this.signUpGroup.get('breakfast').value;
    const lunch = this.signUpGroup.get('lunch').value;
    const dinner = this.signUpGroup.get('dinner').value;
    const access = this.signUpGroup.get('access').value;
    console.log(room, password, arrival, departure,
      breakfast, lunch, dinner, access);
  }

  changeMode() {
    this.isUserMode = !this.isUserMode;
  }

}
