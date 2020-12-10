import { Component, OnInit } from '@angular/core';
import {HomeService} from '../home/home.service';

@Component({
  selector: 'app-qr-access',
  templateUrl: './qr-access.component.html',
  styleUrls: ['./qr-access.component.css']
})
export class QrAccessComponent implements OnInit {

  isUserMode: boolean;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.isUserMode.subscribe(value =>{
      this.isUserMode = value;
    });
  }

}
