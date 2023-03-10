import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor(private authService: AuthService,public router: Router) { }

  formGroup: any;
  responseData: any;
  err: any;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)]),
      password_confirmation: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)]),
    });
  }

  registerProcess() {
    if (this.formGroup.valid) {
      this.authService.register(this.formGroup.value).subscribe({
          next: (data) => {
            this.responseData = data;
            localStorage.setItem('token', this.responseData.token);
            this.authService.setUserRole(this.responseData.user.role);
            this.router.navigate(['/']);
          },
          error: (e) => this.err = e.error.message
        });
    }
  }

}
