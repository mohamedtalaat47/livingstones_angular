import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private http: HttpClient) { }

  getClinics() {
    return this.http.get(`${baseUrl}clinics`);
  }

  addClinic(data: any) {
    return this.http.post(`${baseUrl}clinics`,data);
  }

}
