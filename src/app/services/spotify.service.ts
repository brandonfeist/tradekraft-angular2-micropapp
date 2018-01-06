import { AppSettings } from 'app/app-settings';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
    public tkServiceUrl: string;
    private spotifyUri: string;
    private spotifyCredentialsUri: string;
    private spotifyClientId: string;
    private responseType: string;
    private redirectUri: string;
    private scope: string;
    private spotifyLinkInfoRegex = /https:\/\/open.spotify.com\/(artist|user)\/(\S+)/;
    private spotifyReleaseLinkInfoRegex = /https:\/\/open.spotify.com\/album\/(\S+)/;

    constructor(private http: Http, private router: Router) {
        this.tkServiceUrl = AppSettings.tkServiceUrl;
        this.spotifyUri = AppSettings.spotifyServiceUri;
        this.spotifyCredentialsUri = AppSettings.spotifyCredentialsUri;
        this.redirectUri = AppSettings.frontendUrl + '/login/check-spotify';
        this.spotifyClientId = AppSettings.spotifyClientId;
        this.responseType = 'code';
        this.scope = AppSettings.spotifyScope;
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

        return this.http.get(this.tkServiceUrl + '/v1/spotify/authorize', {
            params: parameters
        })
        .map((res:Response) => res.json());
    }

    resfreshSpotifyToken() {
        let refreshToken = JSON.parse(localStorage.getItem('tradekraft.spotify.access')).refresh_token;
        let parameters: URLSearchParams = new URLSearchParams(
            'refresh_token=' + refreshToken
        );

        return this.http.get(this.tkServiceUrl + '/v1/spotify/authorize/refresh', {
            params: parameters,
            headers: this.getSpotifyAuthHeader()
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

        return headers;
    }

    getSpotifyAuthHeader(): Headers {
        let accessToken: any = undefined;
        if(JSON.parse(localStorage.getItem('tradekraft.spotify.access'))) {
            accessToken = JSON.parse(localStorage.getItem('tradekraft.spotify.access')).access_token;
        }

        let headers: Headers = new Headers();
        headers.append('Spotify-Authorization', 'Bearer ' + accessToken);

        return headers;
    }

    hasSpotifyAuthToken():boolean {
        return (!!localStorage.getItem('tradekraft.spotify.access'));
    }

    getUserInfo() {
        return this.http.get(this.spotifyUri + '/v1/me', {
            headers: this.getAuthHeader()
        })
        .take(1)
        .map((res:Response) => res.json());
    }

    getReleaseAlbum(releaseSpotifyUrl: string) {
        return this.http.get(this.spotifyUri + '/v1/albums/' + this.getReleaseId(releaseSpotifyUrl), {
            headers: this.getAuthHeader()
        })
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

    getUsersPlaylists() {
        return this.http.get(this.spotifyUri + '/v1/me/playlists', {
            headers: this.getAuthHeader()
        })
        .map((res:Response) => res.json()); 
    }

    createPlaylist(userId: string, playlistName: string) {
        return this.http.post(this.spotifyUri + '/v1/users/' + userId + '/playlists', { name: playlistName }, {
            headers: this.getAuthHeader()
        })
        .map((res:Response) => res.json());
    }

    addTracksToUserPlaylist(userId: string, playlistId: string, trackUris: string[]) {
        let uris = {
            uris: trackUris
        };

        return this.http.post(this.spotifyUri + '/v1/users/' + userId + '/playlists/' + playlistId + '/tracks', uris, {
            headers: this.getAuthHeader()
        })
        .map((res:Response) => res.json());
    }

    getArtistType(artistSpotifyUrl: string): string {
        return artistSpotifyUrl.match(this.spotifyLinkInfoRegex)[1];
    }

    getArtistId(artistSpotifyUrl: string): string {
        return artistSpotifyUrl.match(this.spotifyLinkInfoRegex)[2];
    }

    getReleaseId(releaseSpotifyUrl: string): string {
        return releaseSpotifyUrl.match(this.spotifyReleaseLinkInfoRegex)[1];
    }
}
