import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  private  authenticationServiceUrl: string;

  constructor(private http: Http, private router: Router) {
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
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getBasicAuthHeader(username: string, password: string): Headers {
    let headers: Headers = new Headers();
    headers.append('Authorization', "Basic " + btoa(username + ":" + password));

    return headers;
  }
}