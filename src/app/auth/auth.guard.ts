import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {map, take} from 'rxjs/operators';
import {HomeService} from '../home/home.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService,
              private router: Router,
              private fireAuth: AngularFireAuth,
              private homeService: HomeService
  ) {
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
    return this.fireAuth.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth && this.homeService.isUserMode.getValue() === true) {
          return true;
        } else if (this.homeService.isUserMode.getValue() === false) {
          return true;
        }
        //alert('You need to be Logged In!!');
        return this.router.createUrlTree(['/auth']);
      })
    );

  }

}
