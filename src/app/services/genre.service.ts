import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GenreService {
    constructor(private http: Http) {}

    getGenres(parameters?: URLSearchParams) {
        return this.http.get('http://localhost:8087/v1/genres',
        { params: parameters })
        .map((res:Response) => res.json());
    }
}
