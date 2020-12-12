import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CapacityViewService {

  constructor(private fireDB: AngularFireDatabase) {
  }


  getCapacity() {
    return this.fireDB
      .object('controlAforo').valueChanges();
  }
  getPlace(id: string){
    return this.fireDB
      .object('controlAforo/' + id)
      .valueChanges();

  }
}



