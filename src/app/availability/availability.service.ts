import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { text } from '@angular/core/src/render3/instructions';
@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private userUrl = 'http://localhost:8080/api/serv/disp/';
  private userUrls = 'http://localhost:8080/api/serv/sugg/';
  private userUrlss = 'http://localhost:8080/api/serv/suggappoint/';
  private userUrlsss = 'http://localhost:8080/app/sugg/';





  constructor(private http: HttpClient) { }

  getAvailabilityEmail(email: string,startValue: Date,endValue: Date): Observable<any> {
    return this.http.get(this.userUrl + email+ '/' +startValue + '/' + endValue);
  }

  getSuggestionEmail(email: string,startValue: Date, endValue: Date): Observable<any> {
    return this.http.get(this.userUrls + email + '/' + startValue + '/' + endValue);
  }
  getSuggestionEmails(nv: string , emails: string[],startValue: Date, endValue: Date): Observable<any> {
    return this.http.get(this.userUrlsss + nv + '/' +  emails + '/' + startValue + '/' + endValue );
  }
  getAppointment(email: string,startValue: Date): Observable<string>{
    return this.http.get(this.userUrlss + email + '/' + startValue , { responseType: 'text' });
  }
}
