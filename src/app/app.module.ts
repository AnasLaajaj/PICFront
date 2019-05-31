import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PmComponent } from './pm/pm.component';
import { NgZorroAntdModule, NZ_I18N, en_US, fr_FR } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms'
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { AvailabilityComponent } from './availability/availability.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { MetierComponent } from './metier/metier.component';
import { DatepickerComponent } from './sharedcomponents/datepicker/datepicker.component';
import { ParametreComponent } from './parametre/parametre.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PeriodessaiComponent } from './periodessai/periodessai.component';
import { RoleComponent } from './role/role.component';
import { PrivilegeComponent } from './privilege/privilege.component';
import fr from '@angular/common/locales/fr';
import { RouterguardService } from './routerguard.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
registerLocaleData(fr);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PmComponent,
    AvailabilityComponent,
    CollaborateurComponent,
    MetierComponent,
    DatepickerComponent,
    ParametreComponent,
    AppointmentComponent,
    PeriodessaiComponent,
    RoleComponent,
    PrivilegeComponent,
    UnauthorizedComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ReactiveFormsModule

  ],
  providers: [httpInterceptorProviders, { provide: NZ_I18N, useValue: fr_FR }, RouterguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
