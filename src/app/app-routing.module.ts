import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {QrAccessComponent} from './qr-access/qr-access.component';
import {CalendarComponent} from './calendar/calendar.component';
import {CapacityViewComponent} from './capacity-view/capacity-view.component';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {AdminSearchComponent} from './admin-search/admin-search.component';
import {AdminSearchGuard} from './admin-search/admin-search.guard';


const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'admin',
    component: AdminSearchComponent,
    canActivate: [AdminSearchGuard],
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'qr_access',
    component: QrAccessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'capacity',
    component: CapacityViewComponent

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
