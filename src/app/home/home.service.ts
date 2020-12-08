import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  isUserMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  changeMode(changeMode: boolean) {
    this.isUserMode.next(changeMode);
  }
}
