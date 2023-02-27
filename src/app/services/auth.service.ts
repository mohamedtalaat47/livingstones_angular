import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userRole = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(`${baseUrl}login`, data);
  }

  register(data: any) {
    return this.http.post(`${baseUrl}register`, data);
  }

  signOut() {
    return localStorage.clear();
  }

  isLogged() {
    return (localStorage.getItem('token') ? true : false)
  }


  setUserRole(role: string) {
    this.userRole.next(role);
    localStorage.setItem('role', role);

  }

  getUserRole() {
    return this.userRole.asObservable();
  }
}
