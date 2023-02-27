import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.scss']
})
export class DoctorHomeComponent implements OnInit {


  response: any;
  appointments: any;

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService.getDoctorAppointments().subscribe({
      next: (data) => {
        this.response = data;
        this.appointments = this.response.appointments;
        console.log(this.appointments)
      }
    });
  }

}
