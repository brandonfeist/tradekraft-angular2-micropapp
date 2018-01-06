import { AppSettings } from 'app/app-settings';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

@Injectable()
export class YearService {

  private tkServiceUrl: string;

  constructor(private http: Http) {
    this.tkServiceUrl = AppSettings.tkServiceUrl;
  }

  getYears(parameters?: URLSearchParams) {
      return this.http.get(this.tkServiceUrl + '/v1/years',
      { params: parameters })
      .map((res:Response) => res.json());
  }
}
