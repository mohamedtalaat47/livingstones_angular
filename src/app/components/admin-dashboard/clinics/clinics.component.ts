import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent implements OnInit {

  response: any;
  clinics: any;
  formGroup: any;
  clinicAdded: any;
  err: any;
  constructor(private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.getClinics();
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      address: new FormControl("", [Validators.required, Validators.minLength(3)])
    });
  }

  getClinics() {
    this.clinicService.getClinics().subscribe({
      next: (data) => {
        this.response = data;
        this.clinics = this.response.data;
      }
    });
  }

  addClinic() {
    if (this.formGroup.valid) {
      this.clinicService.addClinic(this.formGroup.value).subscribe({
        next: (data) => {
          this.clinicAdded = data;
          this.getClinics();
        },
        error: (e) => this.err = e.error.message
      });
    }
  }
}
