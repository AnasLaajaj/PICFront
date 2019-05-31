import { Injectable } from '@angular/core';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  api: string = environment.apiRole;
  apip: string = environment.apiPrivilege;

  getRoles(): Observable<any> {
    return this.http.get(this.api + '/roles');
  }
  getRole(id: number): Observable<any> {
    return this.http.get(this.api + '/role/' + id);
  }
  getPrivileges(): Observable<any>{
    return this.http.get(this.apip + '/privileges');
  }
save(role:Role): Observable<any>{
return this.http.post(this.api + '/role',role);
}
}
