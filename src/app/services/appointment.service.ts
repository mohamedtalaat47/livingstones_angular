import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getPatients() {
    return this.http.get(`${baseUrl}all_patients`);
  }

  getPatientsPerDay() {
    return this.http.get(`${baseUrl}new_patients_per_day`);
  }

  getPatientAppointments() {
    return this.http.get(`${baseUrl}appointments`);
  }

  getDoctorAppointments() {
    return this.http.get(`${baseUrl}doctor_appointments`);
  }

  getAppointmentDetails(id: any) {
    return this.http.get(`${baseUrl}appointments/${id}`);
  }

  addAppointment(data: any) {
    return this.http.post(`${baseUrl}appointments`, data);
  }

  updateAppointment(data: any) {
    return this.http.post(`${baseUrl}next_appointment`, data);
  }
}
