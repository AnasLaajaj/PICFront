import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  api: string = environment.apiUtilisateurs;

  getUsers(): Observable<any> {
    return this.http.get(this.api + '/users');
  }
  deleteUser(id: number)
  {
    return this.http.delete(this.api + '/user/' + id);
  }
  getUser(id: number): Observable<any> {
    return this.http.get(this.api + '/user/' + id);
  }
save(user:any): Observable<any>{
return this.http.post(this.api + '/user',user);
}
}
