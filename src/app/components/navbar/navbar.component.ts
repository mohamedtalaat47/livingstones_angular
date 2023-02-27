import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  role = localStorage.getItem('role');
  
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut()
    this.router.navigate(['/login']);
  }
}
