import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private http: Http, private router: Router) {}

  authenticate(username: string, password: string) {
    let url = 'http://localhost:8086/oauth/token?grant_type=password' +
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

  getBasicAuthHeader(username: string, password: string): Headers {
    let headers: Headers = new Headers();
    headers.append('Authorization', "Basic " + btoa(username + ":" + password));

    return headers;
  }
}