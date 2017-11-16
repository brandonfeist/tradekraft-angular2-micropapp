import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
    private spotifyUri: string;
    private spotifyCredentialsUri: string;
    private spotifyClientId: string;
    private responseType: string;
    private redirectUri: string;
    private scope: string;
    private spotifyLinkInfoRegex = /https:\/\/open.spotify.com\/(artist|user)\/(\S+)/;

    isAuthenticatedToSpotify: boolean = false;

    constructor(private http: Http, private router: Router) {
        this.spotifyUri = 'https://api.spotify.com';
        this.spotifyCredentialsUri = 'https://accounts.spotify.com';
        this.redirectUri = 'http://localhost:4200/login/check-spotify';
        this.spotifyClientId = '750ea4f964cb4012a1ac34c50654ae7f';
        this.responseType = 'code';
        this.scope = 'user-follow-read%20user-follow-modify%20user-library-read%20user-library-modify%20playlist-modify-public%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20user-read-private%20user-read-email%20user-top-read%20user-read-birthdate';
    }

    connectToSpotify() {
        localStorage.setItem("tradekraft.redirect.referurl", this.router.url);
        this.router.navigate(['/connect/spotify']);
    }

    getAuthorizationCode() {
        window.location.href = this.spotifyCredentialsUri + '/authorize?' + 
        'client_id=' + this.spotifyClientId +
        '&response_type=' + this.responseType +
        '&redirect_uri=' + this.redirectUri +
        '&scope=' + this.scope;
    }

    getSpotifyToken(authCode: string) {
        let parameters: URLSearchParams = new URLSearchParams(
            'code=' + authCode +
            '&redirect_uri=' + this.redirectUri
        );

        return this.http.get('http://localhost:8087/v1/spotify/authorize', {
            params: parameters
        })
        .map((res:Response) => res.json());
    }

    getAuthHeader(): Headers {
        let accessToken: any = undefined;
        if(JSON.parse(localStorage.getItem('tradekraft.spotify.access'))) {
            accessToken = JSON.parse(localStorage.getItem('tradekraft.spotify.access')).access_token;
        }

        let headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + accessToken);

        console.log(headers.get('Authorization'));

        return headers;
    }

    isLoggedIn() {
        return this.http.get(this.spotifyUri + '/v1/me', {
            headers: this.getAuthHeader()
        })
        .take(1)
        .map((res:Response) => res.json());
    }

    isFollowingArtist(artistSpotifyUrl: string) {
        let parameters: URLSearchParams = new URLSearchParams(
            'type=' + this.getArtistType(artistSpotifyUrl) +
            '&ids=' + this.getArtistId(artistSpotifyUrl)
        );

        return this.http.get(this.spotifyUri + '/v1/me/following/contains', {
            headers: this.getAuthHeader(),
            params: parameters
        })
        .map((res:Response) => res.json());
    }

    followArtist(artistSpotifyUrl: string) {
        let parameters: URLSearchParams = new URLSearchParams(
            'type=' + this.getArtistType(artistSpotifyUrl) +
            '&ids=' + this.getArtistId(artistSpotifyUrl)
        );

        return this.http.put(this.spotifyUri + '/v1/me/following', {}, {
            headers: this.getAuthHeader(),
            params: parameters
        })
        .map((res:Response) => res.json());
    }

    unfollowArtist(artistSpotifyUrl: string) {
        let parameters: URLSearchParams = new URLSearchParams(
            'type=' + this.getArtistType(artistSpotifyUrl) +
            '&ids=' + this.getArtistId(artistSpotifyUrl)
        );

        return this.http.delete(this.spotifyUri + '/v1/me/following', {
            headers: this.getAuthHeader(),
            params: parameters
        })
        .map((res:Response) => res.json()); 
    }

    getArtistType(artistSpotifyUrl: string): string {
        return artistSpotifyUrl.match(this.spotifyLinkInfoRegex)[1];
    }

    getArtistId(artistSpotifyUrl: string): string {
        return artistSpotifyUrl.match(this.spotifyLinkInfoRegex)[2];
    }
}
