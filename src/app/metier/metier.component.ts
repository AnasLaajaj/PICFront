import { Component, OnInit } from '@angular/core';
import { Metier } from '../metier/metier';
import { MetierService } from '../metier/metier.service';
import { Observable, Observer  } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';


import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-metier',
  templateUrl: './metier.component.html',
  styleUrls: ['./metier.component.css']
})
export class MetierComponent implements OnInit {
  validateForm: FormGroup;
private metier : Metier;
isVisible = false;
isOkLoading = false;
private metiers : Metier[] =[];
edit = false;
error: string;
  

  ngOnInit() {
    this.metierService.getMetiers().subscribe((metiers) => this.metiers = metiers);
  }
  submitForm = ($event, value) => {
    $event.preventDefault();
    //here 01/03/2019
   
// tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();

    }
    if(!this.edit){
   this.metierService.saveMetier(this.metier = new Metier(value.id,value.userName))
   .subscribe((data) => {console.log(data),this.metiers.push(this.metier),this.handleCancel();
   this.message.create('success', `Métier ajouté`);
   this.edit = false;},reponse => this.error = reponse.error.message);
   }
   if(this.edit){
    this.metierService.saveMetier(this.metier = new Metier(value.id,value.userName))
    .subscribe((data) => {console.log(data),this.updateMetierInFront(this.metier);this.handleCancel();
    this.message.create('success', `Métier modifié`);
    this.edit = false;},reponse => this.error = reponse.error.message);
 
   }
  };
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.edit = false;

    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.edit = false;

  }
  delete(id : number){
    this.metierService.deleteMetier(id).subscribe((data) => {console.log(data);this.metiers = this.metiers.filter(d => d.id !== id)});
    
  }
  eddit(metier: Metier){
    this.edit = true;
this.showModal();
this.metier = metier;
console.log(metier.name);

  }
  updateMetierInFront(data : Metier){
    const i = this.metiers.findIndex(item => item.id === data.id);
    Object.assign(this.metiers[i], data);
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


  constructor(private fb: FormBuilder ,  private metierService: MetierService,private message: NzMessageService) {
    this.validateForm = this.fb.group({
      userName: [ '', [ Validators.required ]],
      id : Number
    });
  }
  reloadPage() {
    window.location.reload();
  }
}
