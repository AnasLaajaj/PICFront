import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenStorageService } from './auth/token-storage.service';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
@Injectable()
export class IsLoggedService implements CanActivate {
  constructor(private logservice:TokenStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.logservice.getToken()) {
      this.router.navigate(['auth/login']);
    }
    return true;
  }
}
