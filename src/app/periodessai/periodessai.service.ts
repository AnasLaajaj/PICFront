import { Injectable } from '@angular/core';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periodessai } from './periodessai';
import { environment } from '../../environments/environment';
import { Appointment } from '../availability/appointment';

@Injectable({
  providedIn: 'root'
})
export class PeriodessaiService {

  constructor(private http: HttpClient) { }

  api: string = environment.apiPeriodessai

  getPeriodessai(id: number): Observable<Periodessai>  {
    return this.http.get<Periodessai>(this.api + '/periodessai/' + id);
  }

  deletePeriodessai(id: number)
  {
    return this.http.delete(this.api + '/periodessai/' + id);
  }
  getPeriodessais(): Observable<any> {
    return this.http.get(this.api + '/periodessais');
  }
  savePeriodessai(periodessai: Periodessai) {
    return this.http.post(this.api + '/periodessai' , periodessai);
  }
  getAppsMail(mail: string) : Observable<any> {
    return this.http.get(this.api + '/apps/' + mail );
  }
  prolongerPeriodessai(periodessai: Periodessai){
    return this.http.post(this.api + '/prolonger', periodessai);
  }
  appointmentReport(appointment:Appointment,nbDays:number): Observable<any>
  {
    return this.http.post(this.api + '/appointmentreport/' + nbDays , appointment )
  }
  appointmentReportt(appointment:Appointment): Observable<any>
  {
    return this.http.post(this.api + '/appointmentreport/', appointment)
  }
  rupturerPeriodessai(periodessai:Periodessai): Observable<any>
  {
    return this.http.post(this.api + '/periodessai/rupture',periodessai)
  }
  validerPeriodessai(periodessai:Periodessai): Observable<any>
  {
    return this.http.post(this.api + '/periodessai/valider',periodessai)
  }

}
