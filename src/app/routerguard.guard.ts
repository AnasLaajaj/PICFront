import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenStorageService } from './auth/token-storage.service';
import { Privilege } from './role/privilege';

@Injectable()
export class RouterguardService implements CanActivate {

  constructor(public router: Router,private tokenStorage: TokenStorageService) {}
  privileges: string[];
 
  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.privileges = this.tokenStorage.getAuthorities();
    let dataPrivilege:String = route.data["privilege"];
    if(this.privileges.some( privilege => privilege==dataPrivilege)) return true;
    else {
      this.router.navigate(['unauthorized']);
      return false;

    }
  }

}

