import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isUserMode = false;

  constructor() {
  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
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
    });
  }

  onSubmit() {
    console.log(this.loginForm);

  }

}
