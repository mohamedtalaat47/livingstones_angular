import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.scss']
})
export class PatientHomeComponent implements OnInit {


  response: any;
  appointments: any;
  doctors: any;
  formGroup: any;
  appointmentAdded: any;
  err: any;
  role = localStorage.getItem('role');

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService,public authService: AuthService) { }

  ngOnInit(): void {
    this.getAppointments();
    this.initForm();
    this.getDoctors();
  }

  initForm() {
    this.formGroup = new FormGroup({
      doctor_id: new FormControl("", [Validators.required]),
      appointment_time: new FormControl("", [Validators.required])
    });
  }

  getAppointments() {
    this.appointmentService.getPatientAppointments().subscribe({
      next: (data) => {
        this.response = data;
        this.appointments = this.response.appointments;
        console.log(this.appointments)
      }
    });
  }

  addAppointment() {
    if (this.formGroup.valid) {
      this.appointmentService.addAppointment(this.formGroup.value).subscribe({
        next: (data) => {
          this.appointmentAdded = data;
          this.getAppointments();
        },
        error: (e) => this.err = e.error.message
      });
    }
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.response = data;
        this.doctors = this.response.data;
      }
    });
  }
}
