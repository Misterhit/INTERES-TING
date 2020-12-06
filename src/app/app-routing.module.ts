import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {QrAccessComponent} from './qr-access/qr-access.component';
import {CalendarComponent} from './calendar/calendar.component';
import {CapacityViewComponent} from './capacity-view/capacity-view.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'qr_access',
    component: QrAccessComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
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
export class AppRoutingModule { }
