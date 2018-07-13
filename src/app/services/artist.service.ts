import { Artist } from 'app/model/artist';
import { AppSettings } from './../app-settings';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class ArtistService {
    private tkServiceUrl: string;

    constructor(private http: Http, private authHttp: AuthHttp) {
        this.tkServiceUrl = AppSettings.tkServiceUrl;
    }

    createArtist(artistData) {
        return this.authHttp.post(this.tkServiceUrl + '/v1/artists', artistData)
        .map((res:Response) => res.json());
    }

    uploadArtistImage(artistImage: File) {
        let formData: FormData = new FormData();
        formData.append('image', artistImage, artistImage.name);

        return new HttpRequest('POST', this.tkServiceUrl + '/v1/artists/image', formData, { 
            reportProgress: true
        });
    }

    deleteArtist(artistSlug: string) {
        return this.authHttp.delete(this.tkServiceUrl + '/v1/artists/' + artistSlug)
        .map((res:Response) => res.json());
    }

    editArtist(artistSlug: string, artistUpdates: Artist) {
        return this.authHttp.put(this.tkServiceUrl + '/v1/artists/' + artistSlug, artistUpdates)
        .map((res:Response) => res.json());
    }

    getArtists(params?: URLSearchParams) {
        return this.http.get(this.tkServiceUrl + '/v1/artists',
        { search: params })
        .map((res:Response) => res.json());
    }

    getArtist(slug: string) {
        return this.http.get(this.tkServiceUrl + '/v1/artists/' + slug,)
        .map((res:Response) => res.json());
    }
}
