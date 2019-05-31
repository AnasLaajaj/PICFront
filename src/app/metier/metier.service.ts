import { Injectable } from '@angular/core';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Metier} from './metier' ;
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetierService {

api: string = environment.apiMetier;

  constructor(private http: HttpClient) { }
  getMetier(id: number): Observable<Metier>  {
    return this.http.get<Metier>(this.api + '/metier/' + id);
  }

  deleteMetier(id: number)
  {
    return this.http.delete(this.api + '/metier/' + id);
  }
  getMetiers(): Observable<any> {
    return this.http.get(this.api + '/metiers');
  }
  saveMetier(metier : Metier) {
    return this.http.post(this.api + '/metier' , metier)
  }
}
