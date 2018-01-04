import { ArtistService } from 'app/services/artist.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AdminEditArtistResolve implements Resolve<any> {

    constructor(private artistService: ArtistService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any     {
        let slug = route.params['slug'];
        
        return this.artistService.getArtist(slug) 
    }
}