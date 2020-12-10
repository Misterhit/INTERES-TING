import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean;
  currentUID: string;

  constructor(private authService: AuthService,
              private changeDetector: ChangeDetectorRef,
              private route: ActivatedRoute,
              private router: Router,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(value => {
      this.loggedIn = value;
      this.changeDetector.detectChanges();
    });
    this.authService.currentID2.subscribe(uid => {
      this.currentUID = uid;
    });
  }

  async onLogoutSync() {
    const success = await this.authService.logoutSync();
    if (success) {
      this.router.navigate(['home']);
    }
  }

}
