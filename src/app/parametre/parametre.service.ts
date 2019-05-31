import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';
import { Parametre} from './parametre'

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  constructor(private http: HttpClient) { }

  api: string = environment.apiParametre

  getParametre(id: number): Observable<Parametre>  {
    return this.http.get<Parametre>(this.api + '/parametre/' + id);
  }

  deleteParametre(id: number)
  {
    return this.http.delete(this.api + '/parametre/' + id);
  }
  getParametres(): Observable<any> {
    return this.http.get(this.api + '/parametres');
  }
  saveParametre(parametre : Parametre) {
    return this.http.post(this.api + '/parametre' , parametre)
  }
}
