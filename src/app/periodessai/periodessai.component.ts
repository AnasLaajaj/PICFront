import { Component, OnInit } from '@angular/core';
import { Periodessai } from './periodessai';
import { PeriodessaiService } from './periodessai.service';
import { Observable, Observer  } from 'rxjs';
import {Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CollaborateurService } from '../collaborateur/collaborateur.service';
import {Collaborateur} from '../collaborateur/collaborateur';
import { Appointment } from '../appointment/appointment';
import { AppointmentService } from '../appointment/appointment.service';

@Component({
  selector: 'app-periodessai',
  templateUrl: './periodessai.component.html',
  styleUrls: ['./periodessai.component.css']
})
export class PeriodessaiComponent implements OnInit {
  validateForm: FormGroup;
  sortName: string | null = null;
  sortValue: string | null = null;
  error:string;
  errorTable:string;

  isVisibleF = false;
  isVisible = false;
  isVisibleAppointments = false;
isOkLoading = false;
edit = false;
private collaborateur: Collaborateur;
private collaborateurs: CollaborateurService;
private periodessai: Periodessai;
private periodessais: Periodessai[] =[];
private apps: Appointment[] = [];



  constructor(private appointmentService:AppointmentService ,private periodessaiService: PeriodessaiService ,
    private message: NzMessageService
    , private router:Router,private fb: FormBuilder,private collaborateurService: CollaborateurService) {
      this.validateForm = this.fb.group({

        collaborateur : [ '', [ Validators.required ] ],
        periodessaiId : Number,
        startDate: ['',Validators.required]
      });
    }

  ngOnInit() {
    this.periodessaiService.getPeriodessais().subscribe((periods) => this.periodessais = periods);
    this.collaborateur = new Collaborateur();

  }
  showModal(): void {
    this.isVisible = true;
    this.collaborateurService.getNewCs().subscribe((collaborateurs) => this.collaborateurs = collaborateurs)
  }
  showAppointments(collaborateur: Collaborateur, mail: string){
    this.isVisibleAppointments = true;
    this.collaborateur=collaborateur;
    this.periodessaiService.getAppsMail(mail).subscribe((apps) => this.apps = apps);
  }
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
  }
  prolonger(periodessai: Periodessai){
    this.periodessaiService.prolongerPeriodessai(periodessai).subscribe((data) => console.log(data));
  }
  rupturer(periodessai:Periodessai){
    this.periodessaiService.rupturerPeriodessai(periodessai).subscribe((data) => console.log(data));
  }
  valider(periodessai:Periodessai){
    this.periodessaiService.validerPeriodessai(periodessai).subscribe((data) => console.log(data));
  }

  cancelApp(code: string)
  {
    this.appointmentService.cancelApp(code).subscribe((data) => console.log(data));
  }
  appointmentReport(appointment:Appointment,nbDays: number)
  {

    this.periodessaiService.appointmentReport(appointment,nbDays)
    .subscribe((data) => {console.log(data),this.apps.push(data)});
  }
  appointmentReportt(appointment:Appointment)
  {

    this.periodessaiService.appointmentReportt(appointment)
    .subscribe((data) =>{ console.log(data),this.apps.push(data)});
  }
  handleOk(): void {
    this.isOkLoading = true;
    this.edit = false;


    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      this.isVisibleAppointments = false;
    }, 30);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleAppointments = false;
    this.edit = false;

  }

  submitForm = ($event, value) => {
    $event.preventDefault();
// tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
    this.collaborateurService.getCollaborater(value.collaborateur).subscribe((collaborateur) =>this.periodessaiService.savePeriodessai(
      this.periodessai = new Periodessai(value.startDate,collaborateur)).subscribe((data) => {
        console.log(data), this.handleCancel(),
      this.message.create('success', `Appointment successfully added`);
      this.edit = false;this.periodessais.push(this.periodessai) },reponse => this.error= reponse.error.message) );
    


  }

}
