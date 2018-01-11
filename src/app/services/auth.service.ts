import { AppSettings } from 'app/app-settings';
import { SnackbarService } from './snackbar.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';

import * as _ from "lodash";

@Injectable()
export class AuthService {

  private authenticationServiceUrl: string;

  constructor(private http: Http, private authHttp: AuthHttp, private router: Router, private snackbarService: SnackbarService) {
    this.authenticationServiceUrl = AppSettings.authServiceUrl; 
  }

  editUser(username: string, patches: Object[]) {
    return this.authHttp.patch(this.authenticationServiceUrl + '/v1/users/' + username, patches)
    .map((res:Response) => res.json());
  }

  registerUser(userData) {
    return this.http.post(this.authenticationServiceUrl + "/v1/users/register", userData)
    .map((res:Response) => res.json());
  }

  deleteUser(username: string) {
    return this.authHttp.delete(this.authenticationServiceUrl + "/v1/users/" + username)
    .map((res:Response) => res.json());
  }

  getUserByUsername(username: String) {
    return this.authHttp.get(this.authenticationServiceUrl + "/v1/users/" + username)
    .map((res:Response) => res.json());
  }

  getUsers() {
    return this.authHttp.get(this.authenticationServiceUrl + "/v1/users")
    .map((res:Response) => res.json());
  }

  authenticate(username: string, password: string) {
    let url = this.authenticationServiceUrl + '/oauth/token?grant_type=password' +
      '&client_id=testjwtclientid' +
      '&client_secret=MaYzkSjmkzPC57L' +
      '&username=' + username +
      '&password=' + password;

    return this.http.post(url, {})
    .map((response: Response) => {
      let jwt = response.json();

      if(jwt && jwt.access_token) {
        localStorage.setItem('token', JSON.stringify(jwt));
      }

      return response;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.snackbarService.openSnackbar("Successfully logged out.");
    // window.location.reload();
  }

  loggedIn() {
    let jwt = JSON.parse(localStorage.getItem('token'));
    if(jwt) {
      if(tokenNotExpired(undefined, jwt.access_token)) {
        return true;
      }

      localStorage.removeItem('token');
      return false;
    } 

    return false;
  }

  getAllRoles() {
    return this.authHttp.get(this.authenticationServiceUrl + "/v1/permissions/roles")
    .map((res:Response) => res.json());
  }

  getPermissions() {
    return this.decodeToken().authorities;
  }

  getAllPermissions() {
    return this.authHttp.get(this.authenticationServiceUrl + "/v1/permissions/permissions")
    .map((res:Response) => res.json());
  }

  hasAllPermissions(permissions: string[]): boolean {
    if(this.loggedIn()) {
      let usersPermissions = this.getPermissions();
      
      return (_.difference(permissions, usersPermissions).length === 0)
    }

    return false;
  }

  hasAtLeastOnePermission(permissions: string[]): boolean {
    if(this.loggedIn()) {
      let usersPermissions = this.getPermissions();
      
      return (_.difference(permissions, usersPermissions).length !== permissions.length)
    }

    return false;
  }

  getUserImage(): string {
    let decodedToken = this.decodeToken();

    if(decodedToken && decodedToken.image !== null) {
      return decodedToken.image;
    }

    return AppSettings.defualtUserImage;
  }

  getUsername(): string {
    let decodedToken = this.decodeToken();

    if(decodedToken && decodedToken.user_name !== null) {
      return decodedToken.user_name;
    }

    return undefined;
  }

  decodeToken() {
    if(localStorage.getItem('token')) {
      let token = JSON.parse(localStorage.getItem('token')).access_token;
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace('-', '+').replace('_', '/');

      return JSON.parse(window.atob(base64));
    }

    return undefined;
  }

  getBasicAuthHeader(username: string, password: string): Headers {
    let headers: Headers = new Headers();
    headers.append('Authorization', "Basic " + btoa(username + ":" + password));

    return headers;
  }
}