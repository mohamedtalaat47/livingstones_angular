import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  response: any;
  patients: any;

  public chartType = 'bar';
  constructor(private appointmentService: AppointmentService, private http: HttpClient) { }

  ngOnInit(): void {
    this.appointmentService.getPatients().subscribe({
      next: (data) => {
        this.response = data;
        this.patients = this.response.patients;
      }
    });
  }

}
