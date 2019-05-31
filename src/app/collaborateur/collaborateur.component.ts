import { Component, OnInit } from '@angular/core';
import { Metier } from '../metier/metier';
import { MetierService } from '../metier/metier.service';
import { Observable, Observer  } from 'rxjs';
import {Router} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import {CommunicationService} from '../communication.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CollaborateurService } from './collaborateur.service';
import {Collaborateur} from './collaborateur';
import { AvailabilityService } from '../availability/availability.service';
import { TimeSuggestion } from '../availability/timesuggestion';
import { Appointment } from '../appointment/appointment';
import { AppointmentService } from '../appointment/appointment.service';
import { MapType } from '@angular/compiler';
import { Mapp } from './mapp';
@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.css']
})
export class CollaborateurComponent implements OnInit {
  private metiers: Metier[];
  validateForm: FormGroup;
  isVisibleF = false;
  isVisible = false;
  isVisibleManuel = false;
  error: string;
  errorTable:string;
  isVisibleAppointments = false;
isOkLoading = false;
edit = false;
private collaborateur: Collaborateur;
private collaborateurs: Collaborateur[] = [];
private sugs: Mapp[];
private apps: Appointment[] =[];
private managers: Collaborateur[];
startValue: Date;
endValue: Date;
subscription: Subscription;
checked = false;
reponse = 'test';
appointments: Appointment[];
options: string[] = [];
nbDays: number;
visible = false;
resp: Collaborateur;
managersdisp : Collaborateur[];
managersdispmails : string[] = [];




open(): void {
  this.visible = true;
}

close(): void {
  this.visible = false;
}
  onChange(value: string): void {
    if (!value || value.indexOf('@') >= 0) {
      this.options = [];
    } else {
      this.options = ['ilemgroup.com'].map(domain => `${value}@${domain}`);
    }
  }


  ngOnInit() {
    this.metierService.getMetiers().subscribe((metiers) => {this.metiers = metiers; } );
    this.appointmentService.getAppointments().subscribe((appointments) => {this.appointments = appointments;});
    this.collaborateurService.getCollaboraters().subscribe((collaborateurs) => this.collaborateurs = collaborateurs);
   // setInterval(() => {    this.collaborateurService.getCollaboraters().subscribe((collaborateurs) => this.collaborateurs = collaborateurs);
    //  ;this.appointmentService.check(this.appointments).subscribe((data) => console.log(data));}, 10000);
 this.collaborateurService.getManagers().subscribe((managers) => {this.managers = managers; });

 const children: Collaborateur[] = [];
 for (let i = 10; i < 36; i++) {
   children.push();
 }
 this.managers = children;
  }

  showModal(): void {
    this.isVisible = true;
    console.log(this.edit)
  }
  showModalF(): void {
    this.isVisibleF = true;
  }
  showModalAppointment(outlookMail: string): void {
    this.isVisibleAppointments = true;
    this.appointmentService.getAppointmentsByMail(outlookMail).subscribe((apps) => this.apps = apps );
  }


  handleOk(): void {
    this.isOkLoading = true;
    this.edit = false;
    this.validateForm.reset();
    this.error = null;
    this.communicationService.sendOpenStatus(false);

    setTimeout(() => {
      this.isVisible = false;
      this.isVisibleF = false;
      this.isVisibleAppointments = false;
      this.isVisibleManuel = false;
      this.validateForm.reset();
      this.error = null;
      this.communicationService.sendOpenStatus(false);


      this.sugs = null;
      this.isOkLoading = false;
    }, 30);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleF = false;
    this.isVisibleAppointments = false;
    this.isVisibleManuel = false;
    this.validateForm.reset();
    this.error = null;
    this.communicationService.sendOpenStatus(false);



    this.edit = false;
    this.sugs = null;

  }
  getReponse(code: string) {
    this.appointmentService.getAppointmentStatus(code).subscribe((reponse) => this.reponse = reponse);
  }
  cancelApp(code: string)
  {
    this.appointmentService.cancelApp(code).subscribe((data) => console.log(data));
  }
  appointmentReport(code: string, endVal: Date,nbDays: number)
  {

    this.appointmentService.appointmentReport(code, endVal,nbDays)
    .subscribe((data) => {console.log(data),this.apps.push(data)});
  }
  appointmentReportt(code: string,endVal: Date)
  {

    this.appointmentService.appointmentReportt(code, endVal)
    .subscribe((data) =>{ console.log(data),this.apps.push(data)});
  }
  freeTime(collaborateur: Collaborateur){
    this.showModalF();
    this.collaborateur = collaborateur;
  }
  getResultsFreeTime(startValue: Date,endValue: Date) {
this.managersdispmails = [];
console.log(this.startValue);
console.log(this.collaborateur.outlookMail);
this.isVisibleManuel = true;
this.managersdisp.forEach((mn) => this.managersdispmails.push(mn.outlookMail));
console.log(this.managersdispmails);
this.availabilityService.getSuggestionEmails(this.collaborateur.outlookMail,this.managersdispmails,
  startValue, endValue).subscribe((sugs) => this.sugs = sugs);
  console.log(this.sugs);

  }

  appointManuel(itemm:any,mn: string,startVal: Date){
this.appointmentService.appointManuel(this.collaborateur.outlookMail,mn,startVal)
.subscribe((data) => {console.log(data), itemm.isFinished = true});


  }

  setPresentations(email: string,dateArrivee: Date)
  {
    this.collaborateurService.setPresentations(email,dateArrivee).subscribe((data)=> console.log(data));
  }
  replanifierPresentations(collaborateur: Collaborateur){
    this.collaborateurService.replanifierPresentations(collaborateur).subscribe((data) => console.log(data));

  }
  eddit(collaborateur: Collaborateur){
   this.checked = collaborateur.newCol;
    this.edit = true;
this.showModal();
this.collaborateur = collaborateur;

  }
  compareMetier = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);
  compareResp = (o1: any, o2: any) => (o1 && o2 ? o1.collaborateurId === o2.collaborateurId : o1 === o2);


  delete(id : number){
    this.collaborateurService.deleteCollaborater(id)
    .subscribe((data) => {console.log(data), this.collaborateurs = this.collaborateurs.filter(d => d.collaborateurId !== id);
    ;this.message.create('success', `Collaborateur supprimé`);},
     reponse =>{ this.errorTable= reponse.error.message;console.log(this.errorTable)});

  }
  submitForm = ($event, value) => {
    $event.preventDefault();
    //here 01/03/2019
   
// tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();

    }
    console.log(value);
    if(this.edit){
    this.collaborateurService
        .updateCollaborateur(this.collaborateur = new Collaborateur(value.collaborateurId,value.email,
          value.userName,value.checked,value.dateArrivee,value.metier,value.manager))
          .subscribe(data => {console.log(data);this.updateCollaborateurInFront(this.collaborateur);
            this.message.create('success', `Collaborateur modifié`);
            this.handleCancel();
            this.edit = false;},reponse => this.error= reponse.error.message)}
          if(!this.edit) {
            this.collaborateurService
              .save(this.collaborateur = new Collaborateur(value.collaborateurId,value.email,
                value.userName,value.checked,value.dateArrivee,value.metier,value.manager))
              .subscribe(data => {console.log(data);this.collaborateurs.push(this.collaborateur),this.handleCancel();
              this.message.create('success', `Collaborateur ajouté`);
              this.edit = false;}, reponse => this.error= reponse.error.message)}
          }
        
    //hereeeeeeeeeeeeeee
   /* this.collaborateurService.checkEmail(value.email).subscribe((rep) => {
      if(rep === true){this.error = 'E-mail existe déjà'}
      else {
        
      }
    })
    
    */

/*
   this.metierService.getMetier(value.metier)
   .subscribe((metierr) =>
   {if(value.manager != null){

  
   this.collaborateurService.getCollaborater(value.manager)
   .subscribe((resp) =>{
     if(this.edit){
    this.collaborateurService
        .updateCollaborateur(this.collaborateur = new Collaborateur(value.collaborateurId,value.email,
          value.userName,value.checked,value.dateArrivee, metierr,resp))
        .subscribe((data) => {
          console.log(data);
          this.updateCollaborateurInFront(this.collaborateur);
          this.message.create('success', `Collaborateur modifié`);
          this.handleCancel();
          this.edit = false;},
           reponse => this.error= reponse.error.message) 
   } 
   if(!this.edit) {
   this.collaborateurService
        .save(this.collaborateur = new Collaborateur(value.collaborateurId,value.email,
          value.userName,value.checked,value.dateArrivee, metierr,resp))
        .subscribe(data => {console.log(data) , error => console.log(error)
          ,this.collaborateurs.push(this.collaborateur),this.handleCancel();
          this.message.create('success', `Collaborateur ajouté`);
          this.edit = false;}, reponse => this.error= reponse.error.message)
        }
       }
       
       ) 
       }
      else {
        if(this.edit){
          this.collaborateurService
              .updateCollaborateur(this.collaborateur = new Collaborateur(value.collaborateurId,value.email,
                value.userName,value.checked,value.dateArrivee, metierr))
              .subscribe((data) => {
                console.log(data);
                this.updateCollaborateurInFront(this.collaborateur);
                this.message.create('success', `Collaborateur modifié`);
                this.handleCancel();
                this.edit = false;},
                 reponse => this.error= reponse.error.message) 
         } 
         if(!this.edit) {
         this.collaborateurService
              .save(this.collaborateur = new Collaborateur(value.collaborateurId,value.email,
                value.userName,value.checked,value.dateArrivee, metierr))
              .subscribe(data => {console.log(data) , error => console.log(error)
                ,this.collaborateurs.push(this.collaborateur),this.handleCancel();
                this.message.create('success', `Collaborateur ajouté`);
                this.edit = false;}, reponse => this.error= reponse.error.message)
              }

      }
      });
   
  */
    

   

 
updateCollaborateurInFront(data : Collaborateur){
  const i = this.collaborateurs.findIndex(item => item.collaborateurId === data.collaborateurId);
  Object.assign(this.collaborateurs[i], data);
}
  
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
// tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
  }
  reloadPage() {
    window.location.reload();
  }

  check()
  {
    this.appointmentService.check(this.appointments).subscribe((data) => console.log(data));

  }

  constructor(private appointmentService: AppointmentService , private communicationService: CommunicationService,
     private availabilityService:AvailabilityService ,private message: NzMessageService,private router:Router
     ,private fb: FormBuilder,private collaborateurService: CollaborateurService,
       private metierService: MetierService) {
    this.validateForm = this.fb.group({
      userName: [ '', [ Validators.required]],
      email   : [ '', [ Validators.email, Validators.required ] ],
      metier : [ '', [ Validators.required ] ],
      collaborateurId : Number ,
      checked : [ false ],
      dateArrivee: [null],
      manager: [null]
    });
    this.subscription = this.communicationService.getStartValue().subscribe(sv => {
      if (sv) {
        this.startValue=sv;
      } else {
        // clear messages when empty message received
        this.startValue = null;
      }
    });
    this.subscription = this.communicationService.getEndValue().subscribe(ev => {
      if (ev) {
        this.endValue=ev;
      } else {
        // clear messages when empty message received
        this.endValue = null;
      }
    })
    ;
  }
}
