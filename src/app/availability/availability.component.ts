import { Component, OnInit, Output, Input } from '@angular/core';
import {AvailabilityService} from './availability.service';
import {Router} from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import {Av} from './av';
import { TimeSuggestion } from './timesuggestion';
import { NzMessageService } from 'ng-zorro-antd';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule

} from '@angular/forms';


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  info: any;

username: string = "Anas.LAAJAJ@ilemgroup.com";
private avs: Av[];
private sugs: TimeSuggestion[];
private mai: string;
private done: string;
private mails: Array<string> =[];
private sb : boolean= false;
@Input() startValue: Date = null;
@Input() endValue: Date = null;
  endOpen: boolean = false;
  validateForm: FormGroup;
  controlArray: Array<{ id: number, controlInstance: string }> = [];
// tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder , private message: NzMessageService, private token: TokenStorageService, private _availabilityService: AvailabilityService, private _rotuer: Router) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.validateForm = this.fb.group({});
    this.addField();
    }
  Submite(){
    this._availabilityService.getAvailabilityEmail(this.username,this.startValue , this.endValue).subscribe((avs) => {
      console.log(avs);
      this.avs = avs; });

  }
  Submitee(){
    this._availabilityService.getSuggestionEmail(this.username,this.startValue , this.endValue).subscribe((sugs) => {
      console.log(sugs);
      this.sugs = sugs; });

  }

  Submiteee(data: any) {
    data.isLoading = true;
    this._availabilityService.getAppointment(this.username, data.meetingTime).subscribe((done) => {
      console.log(done);
      this.done = done;
      this.message.create('success', `Appointment successfully added`);
      data.isLoading = false; });
  }


  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
   }

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  }

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
    console.log('handleStartOpenChange', open, this.endOpen);
  }

  handleEndOpenChange(open: boolean): void {
    console.log(open);
    this.endOpen = open;
  }

  //////////////////////////////
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = (this.controlArray.length > 0) ? this.controlArray[ this.controlArray.length - 1 ].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };
    const index = this.controlArray.push(control);
    console.log(this.controlArray[ this.controlArray.length - 1 ]);
    this.validateForm.addControl(this.controlArray[ index - 1 ].controlInstance, new FormControl(null, Validators.required));
  }

  removeField(i: { id: number, controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.controlArray.length > 1) {
      const index = this.controlArray.indexOf(i);
      this.controlArray.splice(index, 1);
      console.log(this.controlArray);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  getFormControl(name: string): AbstractControl {
    return this.validateForm.controls[ name ];
  }

  submitForm(){
    this.sugs = null;

    for (const i in this.validateForm.controls) {

      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
      this.mails.push(this.validateForm.value[i]);
      console.log(this.validateForm.value[i]);
    }
   /* this._availabilityService.getSuggestionEmails(this.mails,this.startValue , this.endValue).subscribe((sugs) => {
      console.log(sugs);
      this.sugs = sugs; });
    this.sb =true; */
  }
}


