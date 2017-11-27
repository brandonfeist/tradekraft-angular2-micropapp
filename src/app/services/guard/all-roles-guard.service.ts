import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as _ from "lodash";

@Injectable()
export class AllRolesGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let permissions = route.data["permissions"] as Array<string>;

      let currentUsersRoles;
      if(this.auth.loggedIn()) {
        currentUsersRoles = this.auth.getPermissions();
      } else {
        this.router.navigate(['/login']);
        return false;
      }

      if(this.auth.hasAllPermissions(permissions)) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
  }
}