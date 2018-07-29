import { HttpRequest } from '@angular/common/http';
import { AuthHttp } from 'angular2-jwt';
import { AppSettings } from 'app/app-settings';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReleaseService {
    private tkServiceUrl: string;

    constructor(private http: Http, private authHttp: AuthHttp) {
        this.tkServiceUrl = AppSettings.tkServiceUrl;
    }

    getReleases(parameters?: URLSearchParams) {
        return this.http.get(this.tkServiceUrl + '/v1/releases',
        { params: parameters })
        .map((res:Response) => res.json());
    }

    getRelease(slug: string) {
        return this.http.get(this.tkServiceUrl + '/v1/releases/' + slug,)
        .map((res:Response) => res.json());
    }

    createRelease(releaseData) {
        return this.authHttp.post(this.tkServiceUrl + '/v1/releases', releaseData)
        .map((res:Response) => res.json());
    }

    uploadReleaseImage(releaseImage: File) {
        let formData: FormData = new FormData();
        formData.append('image', releaseImage, releaseImage.name);

        return new HttpRequest('POST', this.tkServiceUrl + '/v1/releases/image', formData, { 
            reportProgress: true
        });
    }

    deleteRelease(releaseSlug: string) {
        return this.authHttp.delete(this.tkServiceUrl + '/v1/releases/' + releaseSlug)
        .map((res:Response) => res.json());
    }
}
