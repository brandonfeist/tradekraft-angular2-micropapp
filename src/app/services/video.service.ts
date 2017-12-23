import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VideoService {
    constructor(private http: Http) {}

    getRandomFeaturedVideo(parameters?: URLSearchParams) {
        return this.http.get('http://localhost:8087/v1/videos/randomFeature',
        { params: parameters })
        .map((res:Response) => res.json());
    }
}
