import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userMode: boolean;

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.isUserMode.subscribe(value => {
    this.userMode = value;
  });
  }

  onChangeMode(userMode) {
    this.homeService.changeMode(userMode);
  }

}

