import { Component, OnInit,OnChanges, SimpleChanges, SimpleChange, Input } from '@angular/core';
import { NzCalendarModule } from 'ng-zorro-antd';

import { TokenStorageService } from '../auth/token-storage.service';
import { Appointment } from '../availability/appointment';
import { AppointmentService } from '../appointment/appointment.service';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  appointments: any[];
  mode = 'month';
  selectedDate : Date ;
  date : Date;
  thisMonth : number;
  checked = false;
cancelled: any[];
  constructor(private token: TokenStorageService,private appointmentService: AppointmentService) { }


  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    this.date = new Date(Date.now());
    this.appointmentService.findAppointmentsOutlook(this.date.getMonth(),this.date.getFullYear())
    .subscribe((data) =>{
      this.appointments = data; console.log(data),
    this.thisMonth = this.date.getMonth();})
    
     
  }

  selectChange(select: Date){
    if(this.thisMonth !== select.getMonth()) {
      this.checked = false;
this.appointmentService.findAppointmentsOutlook(select.getMonth(),select.getFullYear()).subscribe((data) =>
{this.appointments = null;
 this.appointments = data,
 this.thisMonth = select.getMonth();
  console.log(this.appointments)}) ;
}
  }
  showCancelled(){
    if (this.checked){
    this.appointmentService.getCancelledAppointments().subscribe((data) => {this.cancelled = data;data.forEach(appointment => {
      this.appointments.push(appointment);
    })});

  }
  if (!this.checked){
    this.cancelled.forEach(c => {
     const index: number = this.appointments.indexOf(c);
      this.appointments.splice(index, 1)
    
    }
    )
  }
  }
  
  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }
  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
