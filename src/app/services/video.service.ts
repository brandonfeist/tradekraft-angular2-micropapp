import { AppSettings } from 'app/app-settings';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VideoService {
    private tkServiceUrl: string;

    constructor(private http: Http) {
        this.tkServiceUrl = AppSettings.tkServiceUrl;
    }

    getRandomFeaturedVideo(parameters?: URLSearchParams) {
        return this.http.get(this.tkServiceUrl + '/v1/videos/randomFeature',
        { params: parameters })
        .map((res:Response) => res.json());
    }
}
