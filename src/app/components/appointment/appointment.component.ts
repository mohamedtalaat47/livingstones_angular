import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  response: any;
  appointment: any;
  id: any;
  updated: boolean = false;
  formGroup: any;
  err: any;

  constructor(private route: ActivatedRoute, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getAppointment();
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      symptoms: new FormControl("", [Validators.required]),
      diagnosis: new FormControl("", [Validators.required]),
      prescription: new FormControl("", [Validators.required]),
      next_appointment: new FormControl(null),
      id: new FormControl(this.id)
    });
  }

  getAppointment() {
    console.log(this.id);

    this.appointmentService.getAppointmentDetails(this.id).subscribe({
      next: (data) => {
        this.response = data;
        this.appointment = this.response.appointment;
        console.log(this.appointment);
      }
    });
  }

  updateAppointment() {
    if (this.formGroup.valid) {
      this.appointmentService.updateAppointment(this.formGroup.value).subscribe({
        next: (data) => {
          this.response = data;
          this.appointment = this.response.appointment;
          this.updated = true;
          console.log(this.appointment);
        },
        error: (e) => this.err = e.error.message
      });
    }
  }

  generatePDF() {
    const data = document.getElementById('print');
    if (data) {
      html2canvas(data).then(canvas => {
        // create a new jsPDF instance
        const pdf = new jsPDF('p', 'mm', 'a4');

        // add the canvas image to the PDF
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 298, 211);

        // save the PDF
        pdf.save('appointment.pdf');
      });
    }
  }
}
