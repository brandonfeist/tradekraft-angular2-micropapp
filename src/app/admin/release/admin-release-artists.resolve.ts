import { ArtistService } from 'app/services/artist.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AdminReleaseArtistsResolve implements Resolve<any> {

    constructor(private artistService: ArtistService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any     {        
        return this.artistService.getArtists();
    }
}