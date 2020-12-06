import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CapacityViewComponent } from './capacity-view/capacity-view.component';
import { HeaderComponent } from './header/header.component';
import { QrAccessComponent } from './qr-access/qr-access.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CalendarComponent,
    CapacityViewComponent,
    HeaderComponent,
    QrAccessComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
