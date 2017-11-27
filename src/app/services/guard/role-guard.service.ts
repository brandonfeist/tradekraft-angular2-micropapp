import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as _ from "lodash";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let roles = route.data["roles"] as Array<string>;

      let currentUsersRoles = this.auth.getRoles();

      if(_.difference(roles, currentUsersRoles).length === roles.length) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
  }
}