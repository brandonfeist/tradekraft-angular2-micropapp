import { Song } from './../model/song';
import { AuthHttp } from 'angular2-jwt';
import { AppSettings } from 'app/app-settings';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SongService {
    private tkServiceUrl: string;

    constructor(private http: Http, private authHttp: AuthHttp) {
        this.tkServiceUrl = AppSettings.tkServiceUrl;
    }

    getSongs(params?: URLSearchParams) {
        return this.http.get(this.tkServiceUrl + '/v1/songs',
        { search: params })
        .map((res:Response) => res.json());
    }

    createSongs(songData: Song[]) {
      return this.authHttp.post(this.tkServiceUrl + '/v1/songs', songData)
      .map((res:Response) => res.json());
    }

    uploadSongFile(songSlug: string, songFile: File) {
        let formData: FormData = new FormData();
        formData.append('song-slug', songSlug);
        formData.append('song', songFile, songFile.name);

        return this.authHttp.post(this.tkServiceUrl + '/v1/songs/songFile', formData)
        .map((res:Response) => res.json());
    }
}
