import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
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
    });
  }

  async onSubmit() {
    await this.onLoginSync();
  }

  async onLoginSync() {
    const roomNumber = this.loginForm.get('roomNumber').value.toString();
    const password = this.loginForm.get('password').value;
    const success = await this.authService.loginSync(roomNumber, password);
    if (success) {
      await this.router.navigate(['home']);
    } else {
      alert('Login error, check the room or the password!');

    }
  }

}


