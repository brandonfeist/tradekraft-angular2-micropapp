import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
    constructor(private http: Http) {}

    // Client ID
    // 750ea4f964cb4012a1ac34c50654ae7f
    // Client Secret
    // 6a49fb3a01b448c5a33592d2aa2534c9

    // getEvents(params?: URLSearchParams) {
    //     return this.http.get('http://localhost:8087/v1/events',
    //     { search: params })
    //     .map((res:Response) => res.json());
    // }

    // getEvent(slug: string) {
    //     return this.http.get('http://localhost:8087/v1/events/' + slug,)
    //     .map((res:Response) => res.json());
    // }
}
