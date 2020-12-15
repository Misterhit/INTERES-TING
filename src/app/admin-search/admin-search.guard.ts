import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HomeService} from '../home/home.service';
import {tick} from "@angular/core/testing";

@Injectable({
  providedIn: 'root'
})
export class AdminSearchGuard implements CanActivate {


  constructor(private router: Router,
              private homeService: HomeService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean
      | UrlTree>
    | Promise<boolean
    | UrlTree>
    | boolean
    | UrlTree {
    if (this.homeService.isUserMode.getValue() === false) {
      return true;
    }
    this.router.navigate(['/home']);
  }

}
