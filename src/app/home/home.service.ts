import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  isUserMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
  }

  changeMode(changeMode: boolean) {
    this.isUserMode.next(changeMode);

  }
}
