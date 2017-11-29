import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

@Injectable()
export class YearService {

  private resourceServiceUri = "http://localhost:8087";

  constructor(private http: Http) {}

  getYears(parameters?: URLSearchParams) {
      return this.http.get('http://localhost:8087/v1/years',
      { params: parameters })
      .map((res:Response) => res.json());
  }
}
