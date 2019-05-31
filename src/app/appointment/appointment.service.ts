import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
api : string = environment.apiAppointment;

  constructor(private http: HttpClient) { }
  getAppointment(id: string){
    return this.http.get(this.api + '/appointment/' + id);
  }
  deleteAppointment(id: number)
  {
    return this.http.delete(this.api + '/appointment/' + id);
  }
  getAppointments(): Observable<any>{
    return this.http.get(this.api + '/appointments');
  }
  getAppsOrdered(): Observable<any>{
    return this.http.get(this.api + '/appsOrdered');
  }
  getAppointmentsByMail(outlookMail: string): Observable<any>
  {
    return this.http.get(this.api + '/appointments/' + outlookMail)
  }
  findAppointmentsOutlook(month: number , year : number): Observable<any>
  {
    return this.http.get(this.api + '/appsOutlook/' + month +'/' + year);
  }
  save(appointment: Appointment){
    return this.http.post(this.api + '/appointment', appointment);
  }
  getAppointmentStatus(code: string)
  {
    return this.http.get(this.api + '/appointmentstatus/' + code , { responseType: 'text' });
  }
  cancelApp(code: string)
  {
    return this.http.get(this.api + '/appointmentcancel/' + code , { responseType: 'text' })
  }
  appointmentReport(code: String, endVal: Date, nbDays: number): Observable<any>
  {
    return this.http.get(this.api + '/appointmentreport/' + code + '/' + endVal + '/' + nbDays)
  }
  appointmentReportt(code: string, endVal: Date): Observable<any>
  {
    return this.http.get(this.api + '/appointmentreport/'  + code + '/' + endVal )
  }
  check(appointments: Appointment[]): Observable<any> {
    return this.http.post(this.api + '/check', appointments);
  }
  appointManuel(nv: string,mn: string,startValue: Date){
    return this.http.get(this.api +'/appmanuel/' + nv + '/' + mn + '/' + startValue );
    
  }
  getCancelledAppointments(): Observable<any>{
    return this.http.get(this.api +'/appscr' );
    
  }
}
