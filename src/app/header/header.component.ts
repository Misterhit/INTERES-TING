import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from "../home/home.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean;
  currentUID: string;
  isUserMode: boolean;

  constructor(private authService: AuthService,
              private changeDetector: ChangeDetectorRef,
              private route: ActivatedRoute,
              private router: Router,
              private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(value => {
      this.loggedIn = value;
      this.changeDetector.detectChanges();
    });
    this.authService.currentID2.subscribe(uid => {
      this.currentUID = uid;
    });
    this.homeService.isUserMode.subscribe(value => {
      this.isUserMode = value;
    });
  }

  async onLogoutSync() {
    const success = await this.authService.logoutSync();
    if (success) {
      this.router.navigate(['home']);
      window.location.reload();
    }
  }

}
