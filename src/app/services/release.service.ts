import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReleaseService {
    constructor(private http: Http) {}

    getReleases(parameters?: URLSearchParams) {
        return this.http.get('http://localhost:8087/v1/releases',
        { params: parameters })
        .map((res:Response) => res.json());
    }

    getRelease(slug: string) {
        return this.http.get('http://localhost:8087/v1/releases/' + slug,)
        .map((res:Response) => res.json());
    }
}
