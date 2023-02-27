import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ClinicsComponent } from './components/admin-dashboard/clinics/clinics.component';
import { DoctorsComponent } from './components/admin-dashboard/doctors/doctors.component';
import { PatientsComponent } from './components/admin-dashboard/patients/patients.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { DoctorHomeComponent } from './components/doctor-home/doctor-home.component';
import { LoginComponent } from './components/login/login.component';
import { PatientHomeComponent } from './components/patient-home/patient-home.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { DoctorGuard } from './guards/doctor.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: PatientHomeComponent, canActivate: [AuthGuard] },
  { path: 'doctor', component: DoctorHomeComponent, canActivate: [DoctorGuard] },
  {
    path: 'admin', component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'clinics', pathMatch: 'full' },
      { path: 'clinics', component: ClinicsComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'patients', component: PatientsComponent }
    ],
    canActivate: [AdminGuard]
  },
  { path: 'appointment/:id', component: AppointmentComponent, canActivate: [DoctorGuard] },
  { path: '**', component: PatientHomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
