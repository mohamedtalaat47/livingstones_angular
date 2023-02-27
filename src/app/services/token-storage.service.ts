import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    })
    return next.handle(tokenizedReq)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
