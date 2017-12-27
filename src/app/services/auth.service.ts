import { SnackbarService } from './snackbar.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import * as _ from "lodash";

@Injectable()
export class AuthService {

  private authenticationServiceUrl: string;

  constructor(private http: Http, private router: Router, private snackbarService: SnackbarService) {
    this.authenticationServiceUrl = 'http://localhost:8086';
  }

  authenticate(username: string, password: string) {
    let url = this.authenticationServiceUrl + '/oauth/token?grant_type=password' +
      '&client_id=testjwtclientid' +
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

  getPermissions() {
    return this.decodeToken().authorities;
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

    return '/assets/images/default-profile.png';
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