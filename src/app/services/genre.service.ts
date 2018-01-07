import { AppSettings } from './../app-settings';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GenreService {
    private tkServiceUrl: string;

    constructor(private http: Http, private authHttp: AuthHttp) {
        this.tkServiceUrl = AppSettings.tkServiceUrl;
    }

    getGenres(parameters?: URLSearchParams) {
        return this.http.get(this.tkServiceUrl + '/v1/genres',
        { params: parameters })
        .map((res:Response) => res.json());
    }

    getGenre(id: number) {
        return this.http.get(this.tkServiceUrl + '/v1/genres/' + id,)
        .map((res:Response) => res.json());
    }

    createGenre(genreData) {
        return this.authHttp.post(this.tkServiceUrl + '/v1/genres', genreData)
        .map((res:Response) => res.json());
    }

    editGenre(genreId: number, patches: Object[]) {
        return this.authHttp.patch(this.tkServiceUrl + '/v1/genres/' + genreId, patches)
        .map((res:Response) => res.json());
    }

    deleteGenre(genreId: number) {
        return this.authHttp.delete(this.tkServiceUrl + '/v1/genres/' + genreId)
        .map((res:Response) => res.json());
    }
}
