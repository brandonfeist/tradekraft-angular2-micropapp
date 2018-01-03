import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {
    constructor(private http: Http, private authHttp: AuthHttp) {}

    createArtist(artistData) {
        return this.authHttp.post('http://localhost:8087/v1/artists', artistData)
        .map((res:Response) => res.json());
    }

    uploadArtistImage(artistSlug: string, artistImage: File) {
        let formData: FormData = new FormData();
        formData.append('artist-slug', artistSlug);
        formData.append('image', artistImage, artistImage.name);

        return this.authHttp.post('http://localhost:8087/v1/artists/image', formData)
        .map((res:Response) => res.json());
    }

    deleteArtist(artistSlug: string) {
        return this.authHttp.delete('http://localhost:8087/v1/artists/' + artistSlug)
        .map((res:Response) => res.json());
    }

    getArtists(params?: URLSearchParams) {
        return this.http.get('http://localhost:8087/v1/artists',
        { search: params })
        .map((res:Response) => res.json());
    }

    getArtist(slug: string) {
        return this.http.get('http://localhost:8087/v1/artists/' + slug,)
        .map((res:Response) => res.json());
    }
}
