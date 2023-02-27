import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClinicService } from 'src/app/services/clinic.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  response: any;
  clinicsResponse: any;
  doctors: any;
  clinics: any;
  formGroup: any;
  doctorAdded: any;
  err: any;

  constructor(private doctorService: DoctorService, private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.getDoctors();
    this.getClinics();
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      specialization: new FormControl("", [Validators.required, Validators.minLength(2)]),
      clinic_id: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.response = data;
        this.doctors = this.response.data;
      }
    });
  }

  getClinics() {
    this.clinicService.getClinics().subscribe({
      next: (data) => {
        this.clinicsResponse = data;
        this.clinics = this.clinicsResponse.data;
      }
    });
  }

  addDoctor() {
    if (this.formGroup.valid) {
      this.doctorService.addDoctor(this.formGroup.value).subscribe({
        next: (data) => {
          this.doctorAdded = data;
          this.getDoctors();
        },
        error: (e) => this.err = e.error.message
      });

    }
  }

}
