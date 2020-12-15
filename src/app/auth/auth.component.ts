import {Component, OnInit} from '@angular/core';
import {HomeService} from '../home/home.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  userMode: boolean;


  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.isUserMode.subscribe(value => {
      this.userMode = value;
    });
  }
}
