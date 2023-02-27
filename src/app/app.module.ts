import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PatientHomeComponent } from './components/patient-home/patient-home.component';
import { DoctorHomeComponent } from './components/doctor-home/doctor-home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { TokenStorageService } from './services/token-storage.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PatientsComponent } from './components/admin-dashboard/patients/patients.component';
import { DoctorsComponent } from './components/admin-dashboard/doctors/doctors.component';
import { ClinicsComponent } from './components/admin-dashboard/clinics/clinics.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentComponent } from './components/appointment/appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PatientHomeComponent,
    DoctorHomeComponent,
    AdminDashboardComponent,
    PatientsComponent,
    DoctorsComponent,
    ClinicsComponent,
    AppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenStorageService,
      multi: true,
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
