import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  
  constructor(private http: HttpClient) { }

  getDoctors() {
    return this.http.get(`${baseUrl}doctors`);
  }

  addDoctor(data: any) {
    return this.http.post(`${baseUrl}doctors`,data);
  }
}
