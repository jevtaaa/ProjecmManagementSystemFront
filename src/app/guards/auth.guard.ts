import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root', 
  })
  export class AuthGuard implements CanActivate {
    constructor(private authServ: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (localStorage.getItem('token') != null) {
          let roles = next.data['permittedRoles'] as Array<string>;
          if(roles){
            if(this.authServ.roleMatch(roles)){
              return true;
            }else{
              console.log("YOU DONT HAVE PERMISSION");
              return false;
            }
          }
          return true;
        } else {
          return this.router.navigateByUrl('/login');
        }
      }
  }