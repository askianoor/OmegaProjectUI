import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Access TOKEN JWT
import { AuthInterceptor } from './_service/auth.interceptor';

import { DashboardComponent } from './_component/dashboard/dashboard.component';
import { LoginComponent } from './_component/login/login.component';
import { RegisterFormComponent } from './_component/register-form/register-form.component';
import { UserAuditsComponent } from './_component/user-audits/user-audits.component';
import { ProfileComponent } from './_component/profile/profile.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { ShamsiPipe } from './shamsi.pipe';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterFormComponent,
    UserAuditsComponent,
    ProfileComponent,
    ShamsiPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    DpDatePickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
