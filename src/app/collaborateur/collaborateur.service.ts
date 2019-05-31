import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborateur } from './collaborateur';
import { Metier } from '../metier/metier';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
api:string = environment.apiCollaborateur;


  constructor(private http: HttpClient) { }
  getCollaborater(id: string): Observable<any>{
    return this.http.get(this.api + '/collaborateur/' + id);
  }
  deleteCollaborater(id: number): Observable<any>
  {
    return this.http.delete(this.api + '/collaborateur/' + id);
  }
  getCollaboraters(): Observable<any>{
    return this.http.get(this.api + '/collaborateurs');
  }
  save(collaborateur: Collaborateur){
    return this.http.post(this.api + '/collaborateur', collaborateur);
  }
  updateCollaborateur(collaborateur: Collaborateur){
    return this.http.post(this.api + '/collaborateurUpdate', collaborateur);
  }
  setPresentations(email: String,dateArrivee: Date){
    return this.http.get('http://localhost:8080/api/serv/appointment/'+ email + '/' + dateArrivee ,{ responseType: 'text' });
  }
  getManagers(): Observable<any>{
    return this.http.get(this.api + '/managers');
  }
  getNewCs(): Observable<any>{
    return this.http.get(this.api + '/newCs');
  }
  checkEmail(email:string){
    return this.http.get(this.api + '/checkemail/' + email);
  }
  replanifierPresentations(collaborateur:Collaborateur): Observable<any> {
    return this.http.post('http://localhost:8080/api/serv/appointment/replanifier',collaborateur);
  }

}
