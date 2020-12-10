import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HomeService} from './home.service';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedIn: boolean;
  userMode: boolean;


  constructor(private homeService: HomeService,
              private authService: AuthService,
              private changeDetector: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit(): void {
    this.homeService.isUserMode.subscribe(value => {
      this.userMode = value;
      this.changeDetector.detectChanges();

    });
    this.authService.loggedIn.subscribe(value => {
      this.loggedIn = value;
      this.changeDetector.detectChanges();
    });
  }

  onChangeMode(userMode) {
    this.homeService.changeMode(userMode);
  }


  async onLogoutSync() {
    const success = await this.authService.logoutSync();
    if (success) {
      this.router.navigate(['home']);
    }
  }

}

