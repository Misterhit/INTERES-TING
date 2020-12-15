import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {firebaseConfig} from 'src/environments/environment';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {CalendarComponent} from './calendar/calendar.component';
import {CapacityViewComponent} from './capacity-view/capacity-view.component';
import {HeaderComponent} from './header/header.component';
import {QrAccessComponent} from './qr-access/qr-access.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FooterComponent} from './footer/footer.component';
import {AdminSearchComponent} from './admin-search/admin-search.component';
import {SpinnerComponent} from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CalendarComponent,
    CapacityViewComponent,
    HeaderComponent,
    QrAccessComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    AdminSearchComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
