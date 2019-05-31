import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenStorageService } from './auth/token-storage.service';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(public router: Router,private tokenStorage: TokenStorageService) {}
privileges:string[];
ngOnInit(){
  this.privileges = this.tokenStorage.getAuthorities();
}
  canActivate(): boolean {
    if(this.privileges.includes("GERER_COLLABORATEUR")) return true;
    else {
      this.router.navigate(['unauthorized']);
      return false;

    }
  }

}
